import { Router } from "express";
import * as whyChoseusControler from "./whychooseus.controller";
import auth from "../../midleware/authMidleware";
const pageWhychooseusRoute = Router();
pageWhychooseusRoute.post(
  "/",
  auth("ADMIN", "MODARATOR"),
  whyChoseusControler.createOrUpdateWhyChooseUsSection,
);
pageWhychooseusRoute.get("/", whyChoseusControler.getAllWhyChooseUsSections);
pageWhychooseusRoute.get("/:id", whyChoseusControler.getWhyChooseUsSectionById);
pageWhychooseusRoute.put(
  "/:id",
  auth("ADMIN", "MODARATOR"),
  whyChoseusControler.updateWhyChooseUsSection,
);
pageWhychooseusRoute.delete(
  "/:id",
  auth("ADMIN", "MODARATOR"),
  whyChoseusControler.deleteWhyChooseUsSection,
);

export default pageWhychooseusRoute;
