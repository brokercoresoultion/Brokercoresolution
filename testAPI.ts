import handler from './api/send-newsletter';

const req = {
  method: 'POST',
  body: {
    subject: 'test',
    content: 'test',
    emails: ['test@example.com']
  }
};

const res: any = {
  status: (code: number) => {
    console.log('Status:', code);
    return {
      json: (data: any) => {
        console.log('JSON:', data);
      }
    };
  }
};

handler(req, res).catch(console.error);
