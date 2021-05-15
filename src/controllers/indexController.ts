import { Request, Response } from 'express';

// Headers example
// {
//     host: 'localhost:8000',
//     connection: 'keep-alive',
//     'cache-control': 'max-age=0',
//     'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
//     'sec-ch-ua-mobile': '?0',
//     'upgrade-insecure-requests': '1',
//     'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
//     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//     'sec-fetch-site': 'same-origin',
//     'sec-fetch-mode': 'navigate',
//     'sec-fetch-user': '?1',
//     'sec-fetch-dest': 'document',
//     referer: 'http://localhost:8000/api/usuarios',
//     'accept-encoding': 'gzip, deflate, br',
//     'accept-language': 'en-US,en;q=0.9,es;q=0.8',
//     cookie: 'csrftoken=csRLjKL13NmtJTk2IXYnuBF3wRQ3gaT8utaZFSls5IRcGD5rbUwDwy5JWz6gBcjn; sessionid=lbvri1wu1mfmcctxfd9n7ueo44gyyvtu',
//     'if-none-match': 'W/"ecf-kQN/OOSy3ba27vrZ1SFU8YzEqII"'
//   }

class IndexController {
    index(req: Request, res: Response) {
        res.render('index', {
            ambiente: process.env.ENVIRONMENT
        });
    }

    about(req: Request, res: Response) {
        res.render('about', {
            ambiente: process.env.ENVIRONMENT
        })
    }

    docs(req: Request, res: Response) {
        res.render('api', {
            ambiente: process.env.ENVIRONMENT,
            sesion: 'some-session-token'
        })
    }
}

export const indexController = new IndexController();
 
