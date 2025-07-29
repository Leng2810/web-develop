import _ from "lodash";
import Parameters from "../libs/parameters";

const strongParams = () => (req: any, res: any, next: any) => {
  let _params: Parameters<typeof req.params>;
  Object.defineProperty(req, "parameters", {
    get() {
      return _params.clone();
    },
    set() {
      _params = new Parameters(1);
    },
  });
  req.parameters = _.merge({}, req.body, req.query, req.params);
  next();
};

export default strongParams;
