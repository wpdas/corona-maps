import mongoose from 'mongoose'

const markersSchema = new mongoose.Schema({
  latitude: String,
  longitude: String,
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  },
  enabled: Boolean, // user can disable (must send a justification),
  justification: String,
  description: String,
  kind: {
    type: String,
    enum: ['DEFAULT']
  }
}, { timestamps: true })

const Marker = mongoose.model('Marker', markersSchema)

export default Marker