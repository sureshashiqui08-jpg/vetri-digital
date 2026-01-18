
import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, Mic, MicOff, Search, MapPin, Image as ImageIcon, 
  Upload, Play, Loader2, ExternalLink, Sparkles, Send, Globe, X
} from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

// --- Utility Functions ---
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Sub-components ---

const VeoSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);
    setStatus('Initializing session...');
    
    try {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      // Initialize GoogleGenAI right before making an API call to ensure it uses the latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64 = await blobToBase64(file);
      
      setStatus('Uploading image and starting generation...');
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Make this image come to life with subtle cinematic movement',
        image: {
          imageBytes: base64,
          mimeType: file.type,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        setStatus('Animating... This may take a few minutes.');
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (e) {
      console.error(e);
      setStatus('Error generating video. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
          <Video className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-gray-800">Veo Image Animator</h3>
      </div>
      <p className="text-gray-500 text-sm mb-6">Upload a photo to create a 5-second cinematic animation using Veo AI.</p>
      
      <div className="flex-1 flex flex-col gap-4">
        {videoUrl ? (
          <video src={videoUrl} controls className="w-full rounded-xl shadow-inner bg-black aspect-video" />
        ) : (
          <div className="relative group border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center hover:border-[#2DAA5F] transition-colors cursor-pointer min-h-[160px]">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-[#2DAA5F]" />
            <span className="text-sm font-medium text-gray-600">{file ? file.name : 'Select an image'}</span>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-2 py-4">
            <Loader2 className="w-6 h-6 animate-spin text-[#2DAA5F]" />
            <span className="text-xs text-[#2DAA5F] font-medium animate-pulse">{status}</span>
          </div>
        )}

        <div className="mt-auto flex gap-2">
          <button 
            disabled={!file || loading}
            onClick={handleGenerate}
            className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : 'Generate Animation'}
          </button>
          {videoUrl && (
            <button onClick={() => setVideoUrl(null)} className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const LiveVoiceSection = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState('');
  const sessionRef = useRef<any>(null);
  const audioContexts = useRef<{in: AudioContext, out: AudioContext} | null>(null);

  const toggleSession = async () => {
    if (isActive) {
      sessionRef.current?.close?.();
      setIsActive(false);
      return;
    }

    try {
      // Initialize GoogleGenAI right before making an API call to ensure it uses the latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      audioContexts.current = { in: inCtx, out: outCtx };
      
      let nextStartTime = 0;
      const sources = new Set<AudioBufferSourceNode>();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inCtx.createMediaStreamSource(stream);
            const scriptProcessor = inCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const blob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              // Initiate sendRealtimeInput after live.connect call resolves to prevent race condition
              sessionPromise.then(s => s.sendRealtimeInput({ media: blob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inCtx.destination);
          },
          onmessage: async (msg) => {
            if (msg.serverContent?.outputTranscription) {
              setTranscription(prev => (prev + ' ' + msg.serverContent!.outputTranscription!.text).slice(-200));
            }
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTime = Math.max(nextStartTime, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              source.start(nextStartTime);
              nextStartTime += buffer.duration;
              sources.add(source);
            }
            if (msg.serverContent?.interrupted) {
              sources.forEach(s => s.stop());
              sources.clear();
              nextStartTime = 0;
            }
          },
          onerror: (e) => console.error(e),
          onclose: (e) => setIsActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
      setIsActive(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#F4FBF7] p-6 rounded-2xl border border-[#2DAA5F]/10 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#2DAA5F]/10 rounded-lg text-[#2DAA5F]">
          <Mic className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-gray-800">Campus Voice Live</h3>
      </div>
      <p className="text-gray-500 text-sm mb-6">Experience real-time voice interactions. Ask about courses or campus life orally.</p>
      
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        <button 
          onClick={toggleSession}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all transform active:scale-95 ${isActive ? 'bg-red-500 shadow-lg shadow-red-200' : 'bg-[#2DAA5F] shadow-lg shadow-[#2DAA5F]/20'}`}
        >
          {isActive ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
          {isActive && <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-25"></div>}
        </button>
        
        <div className="w-full text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2DAA5F] mb-2">{isActive ? 'Session Live' : 'Voice Offline'}</p>
          <div className="h-12 text-sm text-gray-600 italic px-4 line-clamp-2">
            {isActive ? transcription || "Listening for your voice..." : "Click the button to start a conversation"}
          </div>
        </div>
      </div>
    </div>
  );
};

const SmartSearchSection = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [links, setLinks] = useState<{title: string, uri: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: { tools: [{ googleSearch: {} }] }
      });
      setResult(response.text || '');
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedLinks = chunks.filter((c: any) => c.web).map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
      setLinks(extractedLinks);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Globe className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-gray-800">Knowledge Grounding</h3>
      </div>
      <div className="relative mb-4">
        <input 
          type="text" 
          placeholder="Latest AI trends in 2025..." 
          className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[200px] text-sm text-gray-700 bg-gray-50 rounded-xl p-4 mb-3">
        {result || <span className="text-gray-400 italic">Get verified real-time answers...</span>}
      </div>

      {links.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Sources</p>
          <div className="flex flex-wrap gap-2">
            {links.map((link, i) => (
              <a key={i} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-[11px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-blue-100">
                <ExternalLink className="w-3 h-3" /> {link.title.slice(0, 15)}...
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ImageEditorSection = () => {
  const [img, setImg] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!img || !prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: img.split(',')[1], mimeType: 'image/png' } },
            { text: prompt }
          ]
        }
      });
      for (const part of response.candidates?.[0].content.parts || []) {
        if (part.inlineData) {
          setImg(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-gray-800">AI Creative Lab</h3>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {img ? (
          <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
            <img src={img} className="max-h-full max-w-full object-contain" />
            {loading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
          </div>
        ) : (
          <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[140px]">
            <input type="file" accept="image/*" onChange={async e => {
              const file = e.target.files?.[0];
              if (file) setImg(await blobToBase64(file).then(b => `data:image/png;base64,${b}`));
            }} className="absolute inset-0 opacity-0 cursor-pointer" />
            <Sparkles className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-xs text-gray-500">Upload to edit</span>
          </div>
        )}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="e.g., 'Make it look like cyberpunk'"
            className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-orange-500"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button 
            disabled={!img || loading}
            onClick={handleEdit}
            className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SmartMapsSection = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<{uri: string, title: string}[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: query,
          config: {
            tools: [{ googleMaps: {} }],
            toolConfig: {
              retrievalConfig: {
                latLng: { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
              }
            }
          },
        });
        setResult(response.text || '');
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const mapsLinks = chunks.filter((c: any) => c.maps).map((c: any) => ({ title: c.maps.title, uri: c.maps.uri }));
        setLinks(mapsLinks);
        setLoading(false);
      }, () => {
        setLoading(false);
        setResult("Need location access to find places nearby.");
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-50 rounded-lg text-red-600">
          <MapPin className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-gray-800">Campus Navigator</h3>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Best study cafes near campus..." 
            className="w-full pl-4 pr-10 py-2 bg-gray-50 rounded-xl text-sm border-none focus:ring-1 focus:ring-red-500"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading} className="absolute right-2 top-1.5 p-1 text-red-600">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto max-h-[150px] bg-red-50/30 rounded-xl p-3 text-sm text-gray-700">
          {result || <span className="text-gray-400 italic">Find campus hotspots...</span>}
        </div>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((l, i) => (
              <a key={i} href={l.uri} target="_blank" className="text-[10px] bg-white border border-red-100 text-red-600 px-2 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {l.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Layout ---

const AiLabs: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2DAA5F]/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#2DAA5F] font-bold tracking-widest uppercase text-xs px-3 py-1 bg-[#2DAA5F]/10 rounded-full mb-4 inline-block">
              Experimental Features
            </span>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Future of Learning Labs <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DAA5F] to-emerald-400">Powered by Gemini AI</span>
            </h2>
          </div>
          <p className="text-gray-500 text-lg max-w-sm">
            Explore our cutting-edge AI sandbox where you can animate campus photos, chat via voice, and get grounded web data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:row-span-2">
            <VeoSection />
          </div>
          <div className="lg:col-span-1">
            <LiveVoiceSection />
          </div>
          <div>
            <SmartSearchSection />
          </div>
          <div className="lg:col-span-1">
            <ImageEditorSection />
          </div>
          <div>
            <SmartMapsSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiLabs;