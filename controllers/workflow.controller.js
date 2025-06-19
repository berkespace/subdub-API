import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';

import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

const reminders = [7,5,3,1]; 

export const sendReminders = serve(async (context)=> {

    const {subscriptionId}=context.requestPayload;
    const subscription=await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }

    for (const daysBefore of reminders) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `reminder-${daysBefore}`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});



const fetchSubscription = async (context, subscriptionId) => {
  const raw = await Subscription.findById(subscriptionId).populate('user', 'name email');
  if (!raw) return null;

  return await context.run('get subscription', () => {
    return raw.toObject(); // ✅ JSON.stringify edilebilir
  });
};



const sleepUntilReminder = async (context,  label , date) =>{
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context,label)=>{
    return await context.run(label,() => {
        console.log(`Triggering ${label} reminder`);
        // Here you would typically send an email or notification
        // For example, using a mail service or notification service
       
    })
}