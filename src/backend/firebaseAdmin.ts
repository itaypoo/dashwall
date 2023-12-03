import admin, {firestore, ServiceAccount} from 'firebase-admin'

const serviceAccount: ServiceAccount = {
    clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
    projectId: process.env.FB_ADMIN_PROJECT_ID,
    privateKey: process.env.FB_ADMIN_PRIVATE_KEY,
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}

export const db = admin.firestore()