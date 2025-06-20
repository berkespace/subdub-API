import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

// POST METHODS
export const createSubscription = async (req, res, next) => {
    try{

        const subscription= await Subscription.create({
            ...req.body,
            user: req.user._id,

        });
        
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: JSON.stringify({ subscriptionId: subscription._id }),
            headers: { "Content-Type": "application/json" },
            retries: 0
            });

            res.status(201).json({
            success: true,
            data: { subscription, workflowRunId }
            });
    
        }
    catch (error) {
        next(error);
    }   
}


// GET METHODS
export const getUserSubscriptions = async (req, res, next) => {

    try{

        if(req.user._id != req.params.id){

            const error = new Error('You are not the owner of this account.');
            error.statusCode = 401;
            throw error;
        }




        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });

    }
    catch (error) {
        next(error);
    }   
}



export const getAllSubscriptions = async (req, res, next) => {
    try{

        const subscriptions = await Subscription.find({});
        res.status(200).json({
            success: true,
            data: subscriptions,
        });

    }
    catch (error) {
        next(error);
    }   
}

export const getUpcomingRenewals = async (req, res, next) => {
    try{
console.log("getUpcomingRenewals called");
        const today = new Date();
        const upcomingSubscriptions = await Subscription.find({
            renewalDate: { $gte: today },
            status: 'active' // Only include active subscriptions
        });

        res.status(200).json({
            success: true,
            data: upcomingSubscriptions,
        });

    }
    catch (error) {
        next(error);
    }   
}


export const getSubscriptionDetails = async (req, res, next) => {
    try{

        const subscription = await Subscription.findById(req.params.id);

        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });

    }
    catch (error) {
        next(error);
    }   
}

// PUT METHODS

export const cancelSubscription = async (req, res, next) => {
    try{

        const subscription = await Subscription.findById({
            _id:req.params.id,
            user: req.user._id, // Ensure the user is the owner of the subscription
        });

        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        subscription.status = 'cancelled';
        await subscription.save();

        res.status(200).json({
            success: true,
            data: subscription,
        });

    }
    catch (error) {
        next(error);
    }   
}


export const updateSubscription = async (req, res, next) => {
    try{

        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });

    }
    catch (error) {
        next(error);
    }   
}


//DELETE METHODS

export const deleteSubscription = async (req, res, next) => {
    try{

        const subscription = await Subscription.findByIdAndDelete({
            _id:req.params.id,
            user: req.user._id, // Ensure the user is the owner of the subscription
        });

        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully',
        });

    }
    catch (error) {
        next(error);
    }   
}