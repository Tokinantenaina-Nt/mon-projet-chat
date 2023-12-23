const express = require('express')
const router = express.Router()
const admin = require('firebase-admin')
const db = require('../firebase');
const Message = db.collection('messages');
const messagesCollection = admin.firestore().collection('messages');
const path = require('path')
const pathSendMess = path.join(__dirname, '../pages/html.html')
router.get('/', (req, res) => {
    res.send('Bienvenue sur l app')
})

router.get('/messages', async (req, res) => {
    try {
        const snapshot = await Message.get();
        const messages = [];
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/messages', async (req, res) => {
    const { sender, content } = req.body;
    try {
        const newMessage = await Message.add({
            sender,
            content,
            timestamp: new Date(),
        });
        res.status(201).json({ id: newMessage.id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/send', (req, res) => {
    res.sendFile(pathSendMess)
});

router.get('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params
        const messageRef = messagesCollection.doc(id);
        const messageDoc = await messageRef.get();
        if (messageDoc.exists) {
            const messageData = messageDoc.data();
            res.json({ id: id, message: 'succes', data: messageData });
        } else {
            res.status(404).json({ message: 'Message non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sender, content } = req.body;
        const messageRef = messagesCollection.doc(id);
        await messageRef.update({
            sender,
            content,
        });
        const updatedMessageDoc = await messageRef.get();
        if (updatedMessageDoc.exists) {

            const updatedMessageData = updatedMessageDoc.data();

            res.json({ message: 'Message mis à jour avec succès', data: updatedMessageData });
        } else {
            // Si le document n'existe pas après la mise à jour
            res.status(404).json({ message: 'Message non trouvé après la mise à jour' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const messageRef = messagesCollection.doc(id);
        await messageRef.delete()
        res.json({ message: 'Message supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router