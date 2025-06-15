import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 1000,
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be greater than 0'], 
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    trim: true,
    enum: ['USD', 'EUR', 'GBP', 'TRY', 'RUB'],
    default: 'USD',
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required'],
    trim: true,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: ['entertainment', 'utilities', 'food', 'health', 'education', 'other'],
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment Method is required'],
    trim: true,
  },

  status: {
    type: String,
    required: [true, 'Status is required'],
    trim: true,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active',
  },
 startDate:{
    type: Date,
    required: [true, 'Start Date is required'],
    validate:{
      validator:(value)=> value < new Date(),
      message: 'Start Date must be in the past'
    }
 },
 renewalDate:{
    type: Date,
    validate:{
      validator:function(value) {
        return value > this.startDate; 
      },
      message: 'Renewal Date must be after Start Date'
    }
 },

 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index:true, // Index for faster lookups
 },


}, { timestamps: true });


subscriptionSchema.pre('save', function(next) {

    if(!this.renewalDate){
        const renewalPeriods={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();

});



const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;