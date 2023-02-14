
const router = require('express').Router();
const {
    getJournals,
    getJournal,
    createJournal,
    updateJournal,
    deleteJournal
} = require('../controller/journal');

router.route('/').get(getJournals).post(createJournal);
router.route('/:journalId').get(getJournal).patch(updateJournal).delete(deleteJournal);

module.exports = router;