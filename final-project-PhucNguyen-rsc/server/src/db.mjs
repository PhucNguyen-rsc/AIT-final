import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

mongoose.connect(process.env.DSN);

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseListSchema'}],
});

const CourseListSchema = new mongoose.Schema({
  schoolID: {type: Number, required: true},
  majorID: {type: String, required: true},
  courseID: {type: Number, required: true},
  sectionID: {type: Number, required: true},
  credits:{type: Number, min: 0, max: 4},
  instructor: {type: String, required: false},
  description: {type: String, required: false},
  instruction_mode: {type: String, required: true, enum:['in-person','virtual']},
  time:[{
    time_date:[{type: String, required: true, enum:['monday', 
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ],
    time_start:{type:Number, required: true, min: 0, max: 24},
    time_end:{type:Number, required: true, min: 0, max: 24}, //adding requirement time_end > time_start later
  }]
  }],
  slug: {
    type: String,
    slug: ['schoolID', 'majorID', 'courseID', 'sectionID']
  }
})

UserSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=username%>'});

mongoose.model('User', UserSchema);
mongoose.model('CourseList', CourseListSchema);

export default mongoose.models.UserSchema; mongoose.models.CourseListSchema