import { Router } from 'express'
import * as CompanyAuthController from '../controllers/company/CompanyAuthController.js'
import * as CompanyProfileController from '../controllers/company/CompanyProfileController.js'
import * as CompanyJobController from '../controllers/company/CompanyJobController.js'
import * as CompanyJobApplicationController from '../controllers/company/CompanyJobApplicationController.js'
import { authCompany } from '../middlewares/auth.js'
import * as AuthRequest from '../requests/AuthRequest.js'
import * as CompanyRequest from '../requests/CompanyRequest.js'
import * as JobRequest from '../requests/JobRequest.js'
import { upload } from '../services/Fileupload.js'

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello !!!' })
})

router.post('/login', AuthRequest.login, CompanyAuthController.login)
router.post(
    '/register',
    CompanyRequest.register,
    CompanyAuthController.register
)
router.post(
    '/change-password',
    authCompany,
    AuthRequest.changePassword,
    CompanyAuthController.changePassword
)

router.get('/profile/show', authCompany, CompanyProfileController.show)
router.put(
    '/profile/update',
    authCompany,
    CompanyRequest.update,
    CompanyProfileController.update
)
router.post(
    '/profile/upload/photo',
    authCompany,
    CompanyRequest.uploadLogo,
    upload.single('picture'),
    CompanyProfileController.uploadLogo
)

router.get('/jobs', authCompany, CompanyJobController.index)
router.post('/jobs', authCompany, JobRequest.create, CompanyJobController.store)
router.put(
    '/jobs/:jobId',
    authCompany,
    CompanyRequest.update,
    CompanyJobController.update
)
router.get('/jobs/:jobId', authCompany, CompanyJobController.show)
router.delete('/jobs/:jobId', authCompany, CompanyJobController.destroy)

router.get(
    '/jobs/:jobId/applications',
    authCompany,
    CompanyJobApplicationController.index
)
router.get(
    '/applications/:applicationId',
    authCompany,
    CompanyJobApplicationController.viewApplication
)
router.put(
    '/applications/:applicationId/status',
    authCompany,
    CompanyJobApplicationController.accepReject
)
router.get(
    '/users/:userId',
    authCompany,
    CompanyJobApplicationController.viewCandidate
)

export default router
