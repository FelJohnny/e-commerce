const Controller = require('./Controller.js');
const RuleServices = require('../Services/Rule_Services.js');

const ruleServices = new RuleServices();
const camposObrigatorios = ['nome']

class RuleController extends Controller {
  constructor() {
    super(ruleServices,camposObrigatorios);
  }
 


}

module.exports = RuleController;
