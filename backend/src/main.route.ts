import { Request, Response, Router } from "express";
import dashboardRoute from "./app/website/web.route";
import seoRoute from "./app/seo/seo.route";

import faqRoute from "./app/faq/faq.routes";
import headerRoute from "./app/header/header.routes";
import pricingRoute from "./app/pricing/pricing.route";
import testimonialRoute from "./app/testimonial/testimonial.route";
import recentRoute from "./app/work/work.route";
import contactRoute from "./app/contact/conatct.routes";
import AuthRoute from "./app/auth/auth.routes";
import faqRouter from "./app/faq/faq.routes";

import uploadRoute from "./app/upload/upload.route";
import blogRoute from "./app/blogs/blog.route";
import webRoute from "./app/homeapis/homeapi.routes";
import memberRoute from "./app/member/member.route";
import robotsRoute from "./app/robots/robots.routes";
import siteMap from "./app/sitemap/sitemap.routes";
import workingProcess from "./app/working_process/process.route";
import pageServiceRoute from "./app/pageservice/page_service.route";
import videoRoute from "./app/video-upload/video.routes";
import bradImageRoute from "./app/brand_images/brandimage.route";
import pageWhychooseusRoute from "./app/whychooseus/whychooseus.route";
import carrerRoute from "./app/carrerpost/carrer.route";
import homeServiceRoute from "./app/homeservice/homeservice.route";
import comparisonRoute from "./app/comparison/comparison.routes";
import industriesRoute from "./app/industry/industry.routes";
import insightRoute from "./app/insight/insight.routes";
import auth from "./midleware/authMidleware";
import ourstoryRouter from "./app/ourstory/ourstory.route";
import teamimageRoute from "./app/team_image/teamimage.route";
import caseRoute from "./app/case-study/caseStudy.routes";

const mainRoute = Router();

mainRoute.use(
  "/api/auth/verify",
  auth("ADMIN", "MODARATOR"),
  (_req: Request, _res: Response) => {
    return "okey";
  },
);
mainRoute.use("/api", faqRoute);
mainRoute.use("/api", headerRoute);
mainRoute.use("/api/pricing", pricingRoute);
mainRoute.use("/api/", testimonialRoute);
mainRoute.use("/api", recentRoute);
mainRoute.use("/api", AuthRoute);
mainRoute.use("/api", contactRoute);
mainRoute.use("/api", faqRouter);
mainRoute.use("/api", blogRoute);
mainRoute.use("/api", memberRoute);
mainRoute.use("/api", dashboardRoute);
// public page route
mainRoute.use("/api", webRoute);
// file upload route
mainRoute.use("/api", uploadRoute);
// seo routes
mainRoute.use("/api", siteMap);
mainRoute.use("/api", seoRoute);
mainRoute.use("/api", robotsRoute);
// new routes
mainRoute.use("/api/our-service", pageServiceRoute);
mainRoute.use("/api/home-service", homeServiceRoute);
mainRoute.use("/api/process", workingProcess);
mainRoute.use("/api/why-choose-us", pageWhychooseusRoute);
mainRoute.use("/api/brand/images", bradImageRoute);
mainRoute.use("/api/jobpost", carrerRoute);

mainRoute.use("/api", videoRoute);
// new
mainRoute.use("/api/comparison", comparisonRoute);
mainRoute.use("/api/industries", industriesRoute);
mainRoute.use("/api/insight", insightRoute);
mainRoute.use("/api/our-story", ourstoryRouter);
mainRoute.use("/api/team-image", teamimageRoute);
mainRoute.use("/api/case-studies", caseRoute);
export default mainRoute;
