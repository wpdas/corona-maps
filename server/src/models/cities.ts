import mongoose from 'mongoose'

const citiesSchema = new mongoose.Schema({
  name: String,
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  }
}, { timestamps: true })

const City = mongoose.model('City', citiesSchema)

export default City