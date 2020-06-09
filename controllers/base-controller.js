
export class BaseController {

    constructor() { }

    tratarErro = (e, res) => {

        console.error(e);

        return res.status(500).json('Ocorreu um problema no servidor');
    };
}

export default BaseController;


