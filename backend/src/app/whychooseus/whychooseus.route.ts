import { Router } from "express";
import * as whyChoseusControler from "./whychooseus.controller";
const pageWhychooseusRoute = Router();
pageWhychooseusRoute.post(
  "/",
  whyChoseusControler.createOrUpdateWhyChooseUsSection,
);
pageWhychooseusRoute.get("/", whyChoseusControler.getAllWhyChooseUsSections);
pageWhychooseusRoute.get("/:id", whyChoseusControler.getWhyChooseUsSectionById);
pageWhychooseusRoute.put("/:id", whyChoseusControler.updateWhyChooseUsSection);
pageWhychooseusRoute.delete(
  "/:id",
  whyChoseusControler.deleteWhyChooseUsSection,
);

export default pageWhychooseusRoute;
