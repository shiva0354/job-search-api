import { Router } from 'express'
import * as UserAuthController from '../controllers/user/UserAuthController.js'
import * as UserJobController from '../controllers/user/UserJobController.js'
import * as UserJobApplicationController from '../controllers/user/UserJobApplicationController.js'
import * as UserCompanyController from '../controllers/user/UserCompanyController.js'
import * as UserProfileController from '../controllers/user/UserProfileController.js'
import { authUser } from '../middlewares/auth.js'
import { upload } from '../services/Fileupload.js'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('Hello !!!')
})

router.post('/register', UserAuthController.register)
router.post('/login', UserAuthController.login)
router.post('/change-password', authUser, UserAuthController.changePassword)

router.get('/profile/show', authUser, UserProfileController.show)
router.put('/profile/update', authUser, UserProfileController.update)
router.post(
    '/profile/upload/photo',
    authUser,
    upload.single('picture'),
    UserProfileController.uploadProfilePicture
)
router.post(
    '/profile/resume/upload',
    authUser,
    upload.single('resume'),
    UserProfileController.uploadResume
)
router.get(
    '/profile/resume/download',
    authUser,
    UserProfileController.downloadResume
)

router.get('/jobs', authUser, UserJobController.jobList)
router.get('/jobs/:jobId', authUser, UserJobController.viewJob)
router.get('/companies/:companyId', authUser, UserCompanyController.viewCompany)
router.get(
    '/companies/:companyId/jobs',
    authUser,
    UserCompanyController.viewCompanyJobs
)

router.post('/jobs/:jobId/apply', authUser, UserJobApplicationController.apply)
router.get('/applications', authUser, UserJobApplicationController.index)
router.post(
    '/applications/:applicationId/cancel',
    authUser,
    UserJobApplicationController.cancelApplication
)

export default router
