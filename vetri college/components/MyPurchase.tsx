
import React, { useState } from 'react';
import { Trash2, AlertCircle, RefreshCw, PlayCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  isBest?: boolean;
}

const initialCourses: Course[] = [
  {
    id: 'ui-ux-01',
    title: 'UI/UX Design',
    description: 'Master the art of crafting user-friendly digital experiences UI/UX Design course. Learn key skills like user research, wireframing, prototyping, and visual design using tools like Figma and Adobe XD.',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhIVFRUVGBcXFxYXFxUVFRYXFhUXFxUXFRYYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0mICUtLS0tLS8tLS0tMC8tLS0vLTYtLy0tLS0tLy0tLS0tLS0tLS0tLS01LS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYBBwj/xABAEAACAQIEAwYDBwMDAgYDAAABAhEAAwQSITEFQVEGEyJhcYEykaEjQlKxwdHwB2JyFILhsvEzkqKjs8I0Y3P/xAAaAQADAQEBAQAAAAAAAAAAAAACAwQBBQAG/8QALxEAAgIBBAECBAYBBQAAAAAAAAECEQMEEiExQRNRImFx0RQykaGx8AUjM0LB4f/aAAwDAQACEQMRAD8A8vVKeVqZbVd7mqQCCK6q1IXUbkVDcxSjavNnqHFa4FoW7jzyFCPiGPOluSNSLcXQOdNfHAVT5j1pyrWbwqDLmNJ2p6WywodEqxwA5UM7qz0ZLoEKEURhMG1ycvLcnanYpINFcMxyopVtNZmCfy9KY3UbQrDjjPLU3SAcRhyhhv8Ag0sOgZ1U6AkVPjrxut4RooiTp1Mk7Dbn0odLRkZZLSCAAT5+pO3Ks5aGOEIz45RtOCcHFycsIg0JiST08/U1orWGw+HiSoJ2ZyJMbwToPagOyV+QyHycD6MPbw1Z8a4X39sKCFIYGeg2b6E/IVP4Ollk7pdB1m4GEqQR1BBH0rH41O7uOgEAHT0Oo+hrWW0t4e2BIRF0En+STWV4tihdul1+GAB1IHP6mhk+AtNF7vkYnH2Mlxl5Tp6HUVGE5H+chB2ImfkaueO2dVcc/CfXddNjzoPD8OuP8CM3+IJJ0/DzMSdPxb0+MrRztRh2ZHECa34fQz0MNz+g+fygK0fbHiy7EypHmdhB6MB8qhNuRIraEdAeStPw3hCIgLqGYiTIkCeQBrPMlafCcWtsgzsFYDUHy6daVkT8HQ0Thue8qOPYFbZVkEBpBHKRG3T/AIqldaveJYwXmGX4V2nmTuarb+GithdC9QoubcegCky86ltjWizbWDRNiFCytp1NauzWoBoeppxqMGn0SAGNTGqQ0xxWMOJHSpUqCgzU4a29zWMq9eZ9B+tHLhVHKfXWjAlOt2SxCqCSdgAST6Ab0bk2drDpYY10Cd15VDd4ej7oCT0EH2I1rZcB7JvfZw7d2LZCusTckidthpzPyrT8A4GmGOIYrORzlZgC3di2r7x/cZjpQGZsuKNrt+x4fxLgrW5KyQNwR4ljeaqGt1v7gLEsdyST6nU1muJ4DI+nwnUeXUfzrWxd8Emq06xrfHooStPt1YDDVIMEKYsbObLIkD2jWm4N2YxN3xBMi8i8rPou/vEedZ84JtgJr1Hg3HFXC2jeJ70LlZdCxK6AnkJAB1I3rJulTPYYSnK0ed4hCdYj1023HrUSWhyGaOZ0Ufzzj05Vc8atZ3a5bT42JhmMLOvqRPIdaCTh+b/xGzc8oGVB/tG/vXsbW3kdlxSjOqBFcHQTcI5Jog9XIgbcgfWpxh3IhmCg/ct6A/5N8TVZC0AIiB0FDYl40Fa5PwCoLyWPZzFd0QUA8BiORU/w1pMV2gYiLahfM+I+w2+c1jeFtlcD8Wn7fzzq/tWpMCpcnDOxpoxyQTfa4OBc5D3HLeIAiZfLuSsiI0j1I0qW1ZLwq25IJ1AOYzEZuWkdBuatMHwld3PsP3q5721YTM5W0nUwJ/c/M0ndfRRKSgiswPZUMB35Eb5RBPz/AGrSIljCKTNu1bG7EhR6FjuayeI7YO7d3grJYmftXBiRHwpudzvG21SYPsZexDC7jrzMehIJHkqjwp7fKnxi0uTl5cm+drkwfazHW7+MvXbQ8DEZTBGbKiqWg7SQT79aBvDWfxeL57/IyPavQf6idl8Nh8Kt60Cjh1SCSe8DBp0OxETpyBrAJqoHQx89R9Q3z+T4sjyRBriVC6Ublpq2CxygEk8gCSfQCtaFxYANKsbRDLrvQt20VJBBBG4OhHqDtXA8ChXA7sGvL4qsrGFLLtVYd60nD7nhjyoZBY1bMvetwSKjAqxxNrxt60K9uKxSPSxMgFSLtUVSJTCdo4aaadTRWs2JFSpUqGgz2nsp2bGKzM7lUQgEKPE0idCdB8jWw7KcPt2rmKVFACXVUHdsvdIYzHWJJPvVf/TUfZ3f81/6avOBD7bGf/2X/wCG3XjoanJJynG+FX8oqeB344li7f44b3TL+jn5VoeK4cvZuovxNbcD1KkCqHgdieJ4x/wgD/z5T/8AQ1ocJiw9y8g3tOq+zWkefmzD2oROf86a8KP/AEeLxVbxq34QfOPmD+1aTjuFFvEXUEQHaI2g6gewMe1Z7jWIVQqmSTJCgSxjTb3rMf50dHVyTwN/Ip0sGrLh/DWdgMpOnITPpH80qx7MYDvmm6AiyBlnxR1bkORrcPas4YgKVVee0zyGm58t6fPIlwjhQwttSl0Yg4buzlyZSORGv111/WkqyI9/3j2/KrTjmLF67mUEKqhQSIJ1JmOW/OlwbhL4hiEgBfiY7CeUczvUjbbO7j2xx2+CrNuRrQ8jlXpvDezNm14mHeMNZfYei7fOTQnb/hYbD96q+O0QTA1KE5SPMAkH2NMgmiDU5oZJLaYPC8PuXpyAabkmAOk1SkGdd+fX3PKrXgmPKO3IMPquo/M0NxEDvCw2bxfPfT1n500nBAP5/wA1Y8O4iUbMxJj5U7HW0yDIoEa9SQevXWPrQlllG4k6zO/t0P1rGrNUmujYYbi9y6Is28pOmZtfQgfvT8H2ZLtnxVwueh19hyA8hTuC460tseNFgayQPfU0/iHa9rmVMNb7xlGUOQVT1jdtvIVNym4wVFkqcVPJK78Gkw1izh0LAJaRRLOxCwPNjsPWqfiPbUA5MHaN59s7SLYPkN39oHnVbh+zF/Ftnxt05eSHQD/FBoPXf1ra8P4VZwohVVcqiXYjQeZ5fStW1cvkXJyfEVSMViOyGPx47zE3gGE5EeVUTyVFHh9TroN6wYw7Kz22BDDMpXmGQ7eZlY969U7Q/wBQrOHlbCm8/wCM6WVP+X3vbQ9a87RC7G5cMuWLk8yxOY6DbX030olmS7FejfTKnbWve+yHZ23gsOogC4yhr1zSSxEkZuSLJAHvuTXh2KwpXzB5+vKvU37SNfs21ueAhFzr+JwBJ9J5UzJNKNoHBppZMm3oB/qLh8PighUHOjQbogFkIPg1EkTBBO0GNzWKHBbI+6T6sf0rTcTxAbQbfmarCKn3SZ2I6XDHhK/qUGJ4An3CVPQ6j9xQ2FRkbKwgj+SPKvQuI9l7lmw966wBXL4Br8TKvibbnsJ9aymMs5hPMaj9RTE30yeWDHJbsfgqsXhtZqqxC61oLrZlqkxC60tcMVNJx4Km4sE0kOtF37HOgzVEZWc/JBxOtXDTjTTRiUMYUqcRSrKGH0L/AE1P2d7/ADX/AKa0HDLRtPi7lzwo1wOGJEZRZQFvISCNeleb9n+0FzCFsqqyvEqZGomCCNt6fxjtLfxIyuQqfgSQp6ZpMt+XlQs62TSznkk/DLzhfae1bfE3cjM964MiDTwrOXMx2+LzNA3MS7PdcsV74guqsQukwsjUgA1TcNEv6D/ire3bLEKoJJ2A1JpE5M6OLT443Kv6iD/SKdAgk6AAQZO0RVf2i4G2Gurmgh1lT5geJD6E++YbcvQuB8F7rx3IL8huE/dqz39TMQo7hJ8cu46hRlE/Mj5UeKLXLOZrtVHI9kOkYzCMZ8JgnppWo4bwpSQ1w52HXXn1PLlFZZNGkeo8p5e21XeH4lebwW1BY7QCzey9abJPwQQcLe40PaLC4dMOxhAxBykAZi8eHXfffymh+wd7W5bjQwwMaSNCJ66jTyNAWez1x/tcQ5PLRgTryzmVGvJQ5/tp+E4icM6gg/ZMVIMglfQgEHK3MCg282O9b/TcPc29zDsxAgRruTA1GUwNzz1/7vxwt27FzvCFthGzk6aEGffXQelZLjH9RkQZcPaZrkH/AMSFVT5hSSx8pHrWD4xxu/imDXrhb+waIp1HhUabc99d6JRJ6AmbxZvxeLzk/F6ag0mbSPPQ+2uvsKie6AI+nnTYJ8hRhD3vcqZBPkKcqAU8CvHi24Dwy3dfnAGsxM84reYDDW7Q8KhQN2PL3rzuwL1kd4oYARLRoOknYU3FcSu3yBdckSIX4UmdyBvScmOU3w+CjDlhBO1bNpxftxZteGyO/udZi2P933v9vzqjw1jH8QZu+P2JylZGW2vXIg1Y7EEz613spw5DNxlkgwARtoDMHnr9K9d4dwZVQZxmYjWZgTyH71O3beOC67bGN8LJN99JHjvaTsycGi3VvMykhTplKmCRzMgwfp1qnwyiJ684j8q9Z7Y8MFyzdsqJzJmUHWHUyo/8yj515Zww22tgyfaDS1upp9oNU+UH4Bcx3kDXc78t/wCaVbWrZYhV1LEADqSYA+dBYK2oXQzJ8v0q0wCRctkcnU/JgaZBF+OG3HZdXuyZtC099gc120jIs6K7QZfr6fOju3mBt2cGotIqKt1TCiPuOJJ5nzNaDtaIsg/hvWD/AO8o/Wq/+olucE/k6fVsv61RtXJzMeac5wcn5+xztjbnB3v8VPydTXk7V69x0ZuH3D1sZv8A0Bq8iYV5op0C+CS+ZQm5DMvQkfU0DiG1mpcU3jY/3H86DxLVs4EccvLQsRckVXNvUjtXLYr0VQrK97OhaawonLUFwUadiZQoimlXDSogKNFh+JXF0mR0P70cnGeqfX/iqYGnA0uTsthnyQVJmi4fx0JdQvbJSfGA3iK88piJ5+3LevX+BYvCOmbDMhBGsHx+jg+IHyNeCIalIB3APrS+j08s5qpM9y412nw+GBz3AW5W0IZz7D4fUwK8e7R8We/ilxL6A/Z5RqETXKB7kmeZmgrK1JibGdGXqNPUais31IWoKi3QSPT8j095+dWnDuINaDQAQ0SDJGnMrMNvs0jyqo7Pt3yr4lUlSCWYIoKidSdN1GnMxVrg8oyQudobMrjwSZCxlMnQg8tetVE77D7vHrpTIXIJlSwgMBtGYbAaaCBWfKk6Abnl/NavrPCTu5jy0mj8NgearA6n9/0FCGmZqz2eZ9XbLPlJPtWdv2WDFW0IJB9jFer28EBvpI0J5/4qNT77TqKynaNDauzYUZrgnNGZhlOuvwr93avJmq26MkqAVIik7CatcLwjncPsP1P7VuOC9iEa2t3vO7dwxtgKGUZebltvbah9RN0iiennCG+XH8mGw3ALpGdxkt6EsQToeijU+ug8633DuxVk4bOhi4yMyllVzAB3GyTHKSJ3qS324wtjBhGlr2Rg1kAnO7SJe5qoGuoOvlpWFHGMZfsnDo5TDAQwzZbYBMxcutqZn4Zg8l5VvLJzY4/thhbfDzhxreaybZshQyq7Ahndx4fOAZ5acvMrdtgA+UxOUNEjNGwO00YblizsO+fqwK2R6Jo1z1bKP7TVdxHijOZuOTAgbaDoqjRR5AAUSVHjUdn8YVcoSPtBn3k5ho31zfKvUrPaq2UlsweNVAnX+07R61882OJOIa0PEjCNJJDAzPlpEf3GtRefiF2z3rKMNYJCZlP2lwkEnIx+7A1I2ka1M8GV5d2Pp9jXqMKx7cna6Np2g7X2rJZ3Ze8jwWswn+3MeQnUk+cV53gFOXYjn5fKjMDg+7YPh+8V0VvH8ZU3FZXJ3EeMxPOorOF7sAE6cjE1uXSSxRt832wtLrMeWVLiukWXDm8JHQ+X6Va4e7GvTWqfBEDY7+X/ADVgBpS8Z3IvdA9W7Za4S6R/+th7XUNAf1FvBcG6nd3QKOpDhz9FNBWu31pbS5rVw3AACBlCkgb5pkD2rGcf43dxb57kACQiD4VB39SdJPlT7Obp9Lk3LcqSd/x9jUcR7U2Bglsgl7j2FQhdkLWspzMdNDyEn0rzjGXciE/L15USaq8dczmBsPqetElbH5XDS43t7f8Af2KQ2yaGxFuKt3QChr4Bo2jhxdFEwoiwtENhvKu27RFA4jYyVkTih3FGXEqFrdahkoWwTLSqciuVpnphoFOFKK6FpTMHA0RbqJEojLFLbCSJrVFWhQiLRdqlthoj4d4Lty3yPjX33q8S7DBuuvvz+uvvVHxJcvd3R9xsrf4t/PrRF6/IIG48Xtsdfl9atxPdElyKmeh4F1uANI16zvz050bbfKYglp00BcjyXZRtv0FZjspisy5SYjWdffb+a1q7GTXJMaTyB9W/STWS4Nxrc6OC2WMnQ9Fgt/ufZdht71W8cwoNs5QPCZ06bHXn/wAVaXDy+gED+etVuP4lbUFfiMEQP1PKkSd9nTwY9sk4ozVEXuJXzYbDreYW2BGUQN9xMTB5iY1ND1yaUnXR05wU1UkZ5blm2olc7cwZVAfOPE3oMo9aDx/E2aM7aD4Roqr5Ig0X2FQdpLhtXiAPi8QPrv8AUGo+CdnMTjW8CEgfExgKg6sSQFEAnX9aujcuj5rM1ibUvAFex5Oi/PnWw/p9/TxuIZr1+6bdpGylQPtHMAmGIyqusczvoNCZsJw7A4PaMZe91wyn1+K97QuvOtFw/tNfwrNcxVxVzW4t4YL4wAZXusOsBBGYeKJkb054HttkX4q5VXBHxbhGG4dfNnC4U3blwK6d5NxFGoAS3qbrSG+PQaaVUcUxKq5fHXmvXxtYtsGcbeF3HhtD+1AT5Cg+Odtr+IJIbuEMrJLd7cXSAXAGUTPhUKu8xzyfeyYRcp3La5gd2La+Aa7iNiZbWjWTakkLeHdJtltxrjty8O7zdzaG2HtSoPRmaZLajVyfIGo+GcbO10Smxb8Pk0/EarLNjMciAXHk+BZCCOZmC/PXy3oxOGX2XvLitlTQFMruvKAinRfWI60ve7sd6Xw9cGjt2ZGa20qdYGvyg60TZxQjVh9az3C7eJQ/Y2mjcrGhB+8xOs+gFXuGxFrEzlbLcHLUT5wRqPOglgjLmHD9vsVaf/IZMTrJ17/f7kr3B1FRG6ORB9CJ+pqO/hmXQyPcQfTTWoSp6j5TUjbTpnejqt0bjR3Esx5EA/yJBoC6tGuAQfhnlBjX5UORNUYnaOPrVL1NzfYCbRpoQUYy0Nct0bJURPUQE1Ky120K8auyJ7VB3hVtcTSqvFUJaugI1ymlq7WA2W4WnKtSAUiKSwEdValRaVgVOopUgkdtpRCLUVtYNGpQMI41jvEZD94Eeh5H5xVFgbu2YbSGHzDfSa09kVnuK2e7xDRtcGceuzfXX3p2nlToXljasuuz2K7u5DHSYPTof39q29zi6qwRRJ18K+JoG5J+6BziK8yFz4W8oP8AtgD0GXL8j6AoYtyotITDEAKIGZifDMfEZiJ2qtxsnjLZJM2l3FXbzBFBljARNz6nn+VC2OH3HuG0EhwCSG8GWBOubblv1HWj8Pwy8t1VsXFuXMgbOkhQGUeLMwiCG3BO/tVrguyl8u13OLDZ8yoozro4dQSCPDIEDXYVFtbZ33qMcI8NJVwY+4IJB3Bg6gjToRofUU1FLGBWk7Sdmkwltbpu5pbKywF1IJ8Oug0OmvKqC2zupZctq0Piuv4bemsSdXOmwnbamQwSk+EZk/yGGENzf3/QHxOFwysr4i2brKGCIGyCdJ7xxqBpEDXXlvUuNv3btsG+6YbDbpbAyo3P7K0vivNoNTO58QqoxHHbSZhhU766Brfu5Qg5zbtMSuhjV+mgB0qhxnEO8bvXuNcufeZnJWdF1MAiRm1Hh5ayZvg1jioo+b1LeoyvJVX+peXOPhVb/RLky5pxFwhrpAHiKQCLfkFkmD4tNc9dv5mBXM1xi3iaTm+7Kz4SfPnzg1y6C47y6zJt1zKCZBAA+EkCMxGoETXBec6IgCkSzDQQCZY3NhyJ0AmQRQSk32ZGCj0K+g8T3mknUAaFoMQxMw0bD4oB1NE8I4zANvuVYE6DIrwv4fFymTPnyoLMlu54pua+NSCgP+3nr/xVinH0QfZ2gPQAVNmlJKop38vuXaSEL3zkkl7q/wBi2sBDILdyfJRlnzAI+lOw9q9ZOZTm/utksp9RuPlVHa44xaWQEHlMEe5q0wWPRpyGDzU71OoyjzJNfOzprNiyPbjkvpVFnkJi7aJt3BuBJQ+q7r7D2qHjNiR3iWMtw/EUgM0mSyNEE/2kT06UdwjiS627ms7E6j5GrK5bAEA5eYKnT5HkehmrYNNWmQ6jFTqSIeHWlvWEYsbikEHNAdWGnIDz+XOgsZw57fiUsy+Rgr6ifqKs7d/LvAncjY+tWNhw2x9qe4Ryqpd+5zvVyaae6H5fYxxuz8c+rJI+cGoGABgEEDaNq1vEeGkjNajN+E6K3p+E/SsdxLEnOAysjiQwYAemo33NSbJYpc9F0s+PUY7i+V4E4qC4lT2mDDQ1J3VNuyWqK1rNdt2taKZCTtXcoG9ePIHvaCqHFtrVrjsQKob92TQMs3fCRmlUeelQgWaJRU1sU5E61OtqlM8MRdKlQaV02oqS2sTQMJCsId6KyaaVHaapQ3SlMIlwzTWv7O9gbeLW3fxebIpJtopKlwREuw1C9AIJiZjfJW1+Ve9WMuUBCCoACwQRAECIo8K5sDI2kUV3sXw9kKf6S2Aeagq3rnBzT714d237O3MLjWwylrisFe0eZR5ADAD4gysNN4nSYr6QAryntjxK5d4g3+kkvat9znQDNuWueP7oBYiZEFTXQwxcpUQ55VEvv6Z8Eu4bCA4h2ztoEaB3VtCxVOv3mbXbMByo7iXa22uZcMovMvxPmC2LfncvHT2FeV4rjFrCoyNdbEOxJa1auMLObYi9dB+0Ouqr86peJcXu3iO8uKLY+GwgKqoJ1m2NNuZkwZjo30oJ8k/rZHFL9zS9oe1YuEt/+XdWQoyMuFtHSclvRro2liY6zpWR4xxF7rq9+47lPuAIot+EfCASEGuw+YO3OH4Vr7G3bVFnX4oUqSCAztJB6flROAQYa81u9bVnGgW4FdBO4HIg6EHbfzrJ5KXyGYcTlJX58sq2DsJkKh1jQI0alkCwc0zpBYdabbvKHi0JOyudMwIiPABk9eu/OtRieB28SrOhNtkBYIoXKeZC6SNtBMDkKA4Nbs3R4lI1AMEK3qx+8fXQ9KXuj3ZT6GTfsrn+/qUndAKTdYM0aANrIbUNcEg/46+o5pyzKGU5UBOmoy7aR97b4gJMwateLcNXC3Y1cXNVLZQsT4gdIzDkYgTtVa86i6WG4A2cDWBGnh9YHSiomlOnQNcRRGUTPyPmvT05fSnYbC53VQRLdeXMz8uVcDE+FdB03n1qZMO6ENsRqKCUXVoLHNOSjL/0tbnAkBUd7EiScmg9pqHEcCv2vEoFxR95NfmBqKhucWJPiGvl+1TYXiUnwMVPSYNTvLKP5kdX8Np8j+B0PsYlmTMVKlDzB9t60OA4nmUSaqb/ABe6UySTzzEz7GaqzdedDFZCcYvjydH0W4KMnbXk13+tAO9EW8YNIOU/T/isYbjkQW/Q0xHbqdPM055kuSWekPSMNxadCM0cwarOO4T/AFTLJ7sICBpmzTHxdI5DzNZGxj2Q6H9KLXtA45UTzqSpkf4FQluiRYnB3MO+uo5MJyn9qs8Ligw1qG32hncVFcxdttQoB8tPyoEq6ZksUvKDMTdAqmxeMpuLxPnVVcuTR2AobezmJvE0Ey1O5plAw6si7ulUtKgPUjVIvWi7SiKHC1OogUqwqJctPFoGmo+lT2oO1YzyOd0KeluK4rU64YE0thIKsRFXfBO2ZwZKNaa6rR8LBSpGg0I1nrpsKxjFi0g5W6ft1FQYvFlSgIgA5jGxjp016V6L+JJFs5Vg2NGz7Vf1Fxdy0wwtoYdZhnLZ7x6hQAAg5SJPQg1i8Nje/tPaV2tlozqDvl2kfeXXagf9eXLZpM70KELAPbmV57EfvVOHPPG3u5RysmGORUuyG+LtlsgBHnvmEnY8tydI33qMZBrJJ8vhVuQZx8Q05Vd4fGLfU2rohvlPmPPyqm4hhzbYZjmA2JGkA7evrVrS27o8oi/5bJcMks8RdHLahW3GgBnXSIFaTAX7V6O9XMpEBpIZZ6EbVS8RVb8MoVTAEgbjowHOgrDvh3Gb4G6ag+YPWo5TtuUDrY8XpJQycx9/b6Gqw11sPdyOZy6hvx2ydG9afxbhDWrpu2hNpxLAfdJ1kDmp8utQFlvqqExcScjfiU7qaP4bjitl1Y5u7OUj+1tj+lFjSkn7P9huTFNU/MX+qJFsDF4ULMXF+FiNmG3zFZTC8CuuzZwVCk5yeUb6861fArqhDl0IfNHtEUdx+072ma3rCnMo3Om486ojVcnP1WBPJa9+foM4ktlsKBbtqDagIyjloGnmDzrG4u2WrYcEsN3DZuY/OqnF8PPIVTgXqY6kc/8AyK9DU7sZjMTaIOtD1qcTgCdxVLjMDk1kRU2XTSjyuirDq4TXPDIFxrDfX86nHEAdxQKqTtTxbFRyhEvjmy+GFtjp0WnC1dbWf57CggKvcDbVlkg/z0oHtiNhKeV/EyuuWXG8H0NRq9X8KOf0P70FimU8gaNRTCcXHyBpUheo5pjmmxjQuU7GXnqA1I1MrRPY3LSyU+a4DWBHO7pVKCKVbtQFmkXWiFFDBtanRgfWoh6RPaFTpZ1kVCriKJS7XrPUTKgAJJjrPKg2K3I8RH4Ty9aZjnZlhdufn5VXYS73cz8O5HQ9RXmrXA7HGuWWV+33Y+0ZCg58/YbzVJxLEI4+ykxyY6+1Q8euRdj7pAPz6VW54Mr/ANqZjxKk2I1GeVuCJMO2jehp/DXuMypb+IzpO9dsCMzNAkaU3hF4reQ85Ees6U6SW33JcbbnV0SYoyTnEMPYgiu2sYHGS5r0PX16Gj+2iBcVcA2MEjoSomqFQOdFFvE+OjckY5RZmtNodJq5sEXUEiQdx0NVJM6HXof3p+DxBtNBHhO4/WlZE/zR7KdNl2PbPplpdJQgg7bH8qMw2JHehtlujI45A8qEcBh5bioFeAQef6HQigxT8nWmlJcGn4csBh0NXmBvRoaz2CuSA41zAE+tXmBXMJNXROXqEWqMADPP8qFa2K5jbwt2zccwqiSd9KxfEeO3b0hJtW/L429SPh9qdDIoJ2cfPillkki07QcVt2vCkPc/CNl83I29N6xeJzOc1wyeg0A9BR6WwB4THyqJ55/p+9T5c8p8F+m0MMfxPlgGQcqaVqe6PKo7aSdvzqeipwi+hq2zVphLkDnTbdkRXSazbYyMVAku3j1oR2p7tUDtTUKySOE1E70neoHatsQOZ6jzU00gKFs8dzU9Kaq1IKxHmdilThSowbL4kjbanrdg0OTNKaiKkg1L9TWrk6fluB1qt7zrTbWMA0Oh5Gs+gyEU3yW9om2Y3B50Pikg5gN+VQDHcj/PMU1saR5r+Vei3Y6Uo0GPgbeITfK6iAeXoapbnAr4Olst5rrVjg7+p86KOII2Yj0JFFHK4cVwBLBjyrc+yjXg2IYx3TDzOg+taXstwS1ZcPdZbl0fCq6qh6k8zVLjb7HdifUk1b9mNFLdFJ/WrcMlLwc7UYljVxZRcful8RdYndjry00qrj2/Ki7zSSTzJM8jNMFmdP57VkwcUG2R5aeACMrHTk3NfXqv5U7u+ldy1PbTKnj9x2CuFD3b+qnkR5HmKPtWFdvEYFVL7QdRy6qeoojDXDl1O3OhaSe5FOnyP/bkaS0mQBUOlaHhryutZbBXfCDWg4c3hq6PQjUrhgfajihVe6UTmGp8p6VmUxHVR8qK7R3PtzryHWgUcc2/nvQS7JsfCDFxKx8K1Bda2fu05X8/oK53nv7Umi+MrQJetodgaHW3rpR7JP8A2NSC0AK2wXG2AlyKj7ypMQwoeKJCZyd0hzXKhZqcajYitsS7GtTIrj3aia5Q2ZaRLNLPUE09RQmORKXp6CaYi1Oorx5WdmlTgKVeNLHORXZmlSpDHoHv3eVCtcP3vY/vSpUSQUn8JKLkaGp7d6N6VKvUYmyRGgyvyos3ZpUqB8j4OuAO/cqww2Mi0babsNT0HQUqVVYnS4J5wU5UyvexFQAx5jpSpV67GuKj0E5lIn68x+9Q3LdKlSJcMJ8xtkD07DmlSovAmD+MuMA+gFaTB6ClSqqHQWqMz2itk3Z6iqxbTUqVZLskh0S2yQdRRNiCeldpUuXRTifglfSgr96lSoOxk3SBWQmobulKlRkcmCvdqFnpUqIVbIzXQtKlQM8iRVqRaVKsCJFqVaVKvGofNKlSrAj/2Q=='
  },
  {
    id: 'python-01',
    title: 'Python Full Stack',
    description: 'This course covers everything from basics to advanced topics, including data structures, object-oriented programming, and web development.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
    isBest: true
  },
  {
    id: 'data-01',
    title: 'Data Analytics',
    description: 'Master data analysis with hands-on experience in cleaning, visualizing, and interpreting data using Excel, Python, Tableau, and SQL. Learn to turn data into actionable insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600'
  }
];

interface MyPurchaseProps {
  onStartLearning: (course: Course) => void;
}

const MyPurchase: React.FC<MyPurchaseProps> = ({ onStartLearning }) => {
  const [activeTab, setActiveTab] = useState('Courses');
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const handleCancel = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setConfirmingId(null);
  };

  const restoreCourses = () => {
    setCourses(initialCourses);
  };

  return (
    <section id="my-purchase" className="bg-white min-h-screen">
      {/* Dashboard Header Banner matching the Mint Green from design */}
      <div className="bg-[#A7E6D7] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tight relative z-10">
          My Purchase
        </h2>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Navigation Tabs with restoration button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 mb-12">
          <div className="flex gap-12">
            {['Courses', 'Achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xl font-bold transition-all relative ${
                  activeTab === tab ? 'text-[#2DAA5F]' : 'text-gray-400'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#2DAA5F] rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          {courses.length < initialCourses.length && (
            <button 
              onClick={restoreCourses}
              className="flex items-center gap-2 text-sm font-bold text-[#2DAA5F] hover:underline mb-4 md:mb-0"
            >
              <RefreshCw className="w-4 h-4" /> Restore All Purchases
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'Courses' ? (
          <>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    className="flex flex-col rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white group"
                  >
                    {/* Course Thumbnail */}
                    <div className="h-56 overflow-hidden relative">
                       {course.isBest && (
                         <div className="absolute top-5 left-5 z-10 bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl border border-gray-100">
                            <div className="w-1.5 h-1.5 bg-[#2DAA5F] rounded-full animate-pulse"></div>
                            BEST COURSES
                         </div>
                       )}
                       
                       {/* Cancel Action Button (Overlay) */}
                       <button 
                        onClick={() => setConfirmingId(course.id)}
                        className="absolute top-5 right-5 z-10 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-400 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                        title="Cancel Purchase"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>

                       <img 
                         src={course.image} 
                         alt={course.title} 
                         className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                       />
                    </div>

                    {/* Content Area - Using the specific Light Green from screenshot */}
                    <div className="p-8 bg-[#DFF2E3]/60 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">{course.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-1 mb-8">
                        {course.description}
                      </p>
                      
                      {/* Action Row */}
                      <div className="space-y-4">
                        <button 
                          onClick={() => onStartLearning(course)}
                          className="w-full py-4 bg-[#2DAA5F] text-white rounded-xl font-bold text-lg hover:bg-[#258d4e] shadow-xl shadow-[#2DAA5F]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          <PlayCircle className="w-5 h-5" /> Start Learning
                        </button>
                        
                        {confirmingId === course.id && (
                          <div className="flex items-center justify-between p-3 bg-white/80 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                            <span className="text-[11px] font-bold text-red-600 uppercase tracking-tight">Confirm Cancel?</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleCancel(course.id)}
                                className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-md hover:bg-red-600 uppercase"
                              >
                                Yes, Remove
                              </button>
                              <button 
                                onClick={() => setConfirmingId(null)}
                                className="px-3 py-1 bg-gray-200 text-gray-700 text-[10px] font-black rounded-md hover:bg-gray-300 uppercase"
                              >
                                Keep
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <AlertCircle className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Your Dashboard is Empty</h3>
                <p className="text-gray-500 mb-8">You haven't enrolled in any courses yet or have cancelled your purchases.</p>
                <button 
                  onClick={restoreCourses}
                  className="px-8 py-3 bg-[#2DAA5F] text-white rounded-xl font-bold hover:bg-[#258d4e] shadow-lg transition-all"
                >
                  Restore Demo Courses
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center bg-gray-50 rounded-[40px] border border-gray-100">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-4xl">🏆</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Achievements Await</h3>
            <p className="text-gray-500">Complete your first lesson to start unlocking certifications and badges.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPurchase;
