import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions,getAllSubscriptions,getSubscriptionDetails,cancelSubscription,updateSubscription,deleteSubscription,getUpcomingRenewals } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get("/", authorize, getAllSubscriptions);

subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/:id", authorize, getSubscriptionDetails); 


export default subscriptionRouter;
