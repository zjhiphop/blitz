/**
Environment fix between BENQ and EF.
*/
if (typeof (cacheSvr) === "undefined") { cacheSvr = "../../"; }
if (typeof (jTemplatePath) === "undefined") { jTemplatePath = "" }

var ET = ET || {};
ET.School = ET.School || {};
/**
* @namespace The global namespace object. Contains all of JS code from BenQ about the iPad project.  
*  
*/
ET.School.UI = ET.School.UI || {};
/**
* @namespace Contains the common components, like ItemBank logic,const,audio player.
*  
*/
ET.School.UI.Common = ET.School.UI.Common || {};
/**
* @namespace Contains the ItemBank logic.
*/
ET.School.UI.Common.ItemBank = ET.School.UI.Common.ItemBank || {};
/**
* @namespace Contains the const text and config values. 
*/
ET.School.UI.Common.Const = ET.School.UI.Common.Const || {};
/**
* @namespace Contains the template logic.  
*/
ET.School.UI.Template = ET.School.UI.Template || {};
/**
* @namespace Contains the activity logic.
*/
ET.School.UI.Activity = ET.School.UI.Activity || {};
/**
* @namespace Contains the common behavior.
*/
ET.School.UI.Common.Behavior = ET.School.UI.Common.Behavior || {};
/**
* @namespace Contains the const text settings
*/
ET.School.UI.Common.Const.text = {
    /**
    * @name ET.School.UI.Common.Const.text#skip
    * @description Skip activity
    */
    "skip": "Skip activity", //gem:überspringen Aktivität  ita:saltare attività
    /**
    * @name ET.School.UI.Common.Const.text#back
    * @description Back
    */
    "back": "Back", //gem:Zurück ita:Indietro
    /**
    * @name ET.School.UI.Common.Const.text#next
    * @description Next
    */
    "next": "Next", //gem:Nächste ita:Prossimo
    /**
    * @name ET.School.UI.Common.Const.text#submit
    * @description Submit
    */
    "submit": "Submit", //gem:Einreichen ita:Presentare
    /**
    * @name ET.School.UI.Common.Const.text#trymore
    * @description Try more
    */
    "trymore": "Try more", //gem:Versuchen mehr ita:Prova di più
    /**
    * @name ET.School.UI.Common.Const.text#moveon
    * @description Move on
    */
    "moveon": "Move on", //gem:Bewegen auf ita:Sposta su
    /**
    * @name ET.School.UI.Common.Const.text#done
    * @description Done
    */
    "done": "Done",
    /**
    * @name ET.School.UI.Common.Const.text#poplbtncontent
    * @description No,Thanks
    */
    "poplbtncontent": "No,Thanks", //eng:No,Thanks  gem:Nicht,Dank ita:No,Grazie
    /**
    * @name ET.School.UI.Common.Const.text#poprbtncontent
    * @description Yes,Please
    */
    "poprbtncontent": "Yes,Please", //eng:Yes,Please gem:Ja,Bitte ita:Sì,Per favore,
    /**
    * @name ET.School.UI.Common.Const.text#popYesNext
    * @description Yes,go to the next question
    */
    "popYesNext": "Yes,go to the next question",
    /**
    * @name ET.School.UI.Common.Const.text#complete
    * @description Complete!
    */
    "complete": "Complete!", //eng:Complete! gem:Vollständig! ita:Completo!
    /**
    * @name ET.School.UI.Common.Const.text#completeContent
    * @description You have completed this activity.
    */
    "completeContent": "You have completed this activity.", //eng:You have completed this activity. gem:Sie haben fertiggestellt dieser Aktivität   ita:Voi avere completato questo attività
    /**
    * @name ET.School.UI.Common.Const.text#excellent
    * @description Excellent!
    */
    "excellent": "Excellent!", //eng:Excellent! gem:Ausgezeichnet ita:Eccellente
    /**
    * @name ET.School.UI.Common.Const.text#execellentContent
    * @description You have finished this activity.
    */
    "execellentContent": "You have finished this activity.", //eng:You have finished this activity. gem:Sie haben fertig dieser Aktivität ita:Voi avere finito questo attività
    /**
    * @name ET.School.UI.Common.Const.text#good
    * @description Good job!
    */
    "good": "Good job!", //eng:Good! gem:Gut ita:Buono
    /**
    * @name ET.School.UI.Common.Const.text#goodContent
    * @description You have finished this activity.
    */
    "goodContent": "You have finished this activity.", //eng:You have finished this activity. gem:Sie haben fertig dieser Aktivität ita:Voi avere finito questo attività
    /**
    * @name ET.School.UI.Common.Const.text#tryagain
    * @description Keep Trying!
    */
    "tryagain": "Keep Trying!", //eng:Try again gem:Versuchen wieder! ita:Prova di nuovo
    /**
    * @name ET.School.UI.Common.Const.text#tryagainContent
    * @description Please keep trying this activity.
    */
    "tryagainContent": "Please keep trying this activity.", //eng:Please try again this activity. gem:Bitte versuchen wieder dieser Aktivität ita:Per favore Prova di nuovo questo attività
    /**
    * @name ET.School.UI.Common.Const.text#question
    * @description Questione:
    */
    "question": "Questione:", //gem:Frage ita:Questione
    /**
    * @name ET.School.UI.Common.Const.text#content
    * @description You have not answered this question. Do you want to go to skip and go to the next one?
    */
    "content": "You have not answered this question. Do you want to go to skip and go to the next one?", //eng:You are not select a option. Are you sure skip current ques? gemSie sind nicht wählen Sie eine Option. Sind Sie sicher überspringen aktuellen Fragen?  ita:Non sei selezionare un'opzione. Sei sicuro di saltare questione attuale?
    /**
    * @name ET.School.UI.Common.Const.text#feedback_bottom_view_left
    * @description View<br/>correct answer
    */
    "feedback_bottom_view_left": "View<br/>correct answer", //gem:Blick<br/>richtige Antwort ita:vista<br/>risposta corretta
    /**
    * @name ET.School.UI.Common.Const.text#feedback_bottom_view_right
    * @description View<br/>my answer
    */
    "feedback_bottom_view_right": "View<br/>my answer", //gem:Blick<br/>meine Antwort ita:vista<br/>il mio risposta
    /**
    * @name ET.School.UI.Common.Const.text#installNow
    * @description Install now
    */
    "installNow": "Install now",
    /**
    * @name ET.School.UI.Common.Const.text#startrecord
    * @description Click to start record..
    */
    "startrecord": "Click to start record..",
    /**
    * @name ET.School.UI.Common.Const.text#wordtyped
    * @description Words typed:
    */
    "wordtyped": "Words typed:",
    /**
    * @name ET.School.UI.Common.Const.text#defaultInputContent
    * @description start typing here..
    */
    "defaultInputContent": "start typing here..",
    /**
    * @name ET.School.UI.Common.Const.text#suggestWods
    * @description Suggest words:20-40
    */
    "suggestWods": "Suggest words:20-40",
    /**
    * @name ET.School.UI.Common.Const.text#writedPopUpText
    * @description You are about to complete a writing assignment. Your writing will be sent to a teacher to be corrected.
    */
    "writedPopUpText": "You are about to complete a writing assignment. Your writing will be sent to a teacher to be corrected.",
    /**
    * @name ET.School.UI.Common.Const.text#writeChallengeSubmitBtn
    * @description Submit text to teacher
    */
    "writeChallengeSubmitBtn": "Submit text to teacher",
    /**
    * @name ET.School.UI.Common.Const.text#isSubmit
    * @description Your writing will be submitted to the teacher
    */
    "isSubmit": "Your writing will be submitted to the teacher",
    /**
    * @name ET.School.UI.Common.Const.text#hasCompleted
    * @description This activity has already been completed.
    */
    "hasCompleted": "This activity has already been completed.",
    /**
    * @name ET.School.UI.Common.Const.text#nextActivity
    * @description Next activity
    */
    "nextActivity": "Next activity",
    /**
    * @name ET.School.UI.Common.Const.text#pending
    * @description Pending
    */
    "pending": "Pending",
    /**
    * @name ET.School.UI.Common.Const.text#ok
    * @description OK
    */
    "ok": "OK",
    /**
    * @name ET.School.UI.Common.Const.text#cancel
    * @description Cancel
    */
    "cancel": "Cancel",
    /**
    * @name ET.School.UI.Common.Const.text#waitingTeacherFeedback
    * @description Awaiting teacher feedback
    */
    "waitingTeacherFeedback": "Awaiting teacher feedback",
    /**
    * @name ET.School.UI.Common.Const.text#viewTeacherFeedbackBtn
    * @description View teacher feedback
    */
    "viewTeacherFeedbackBtn": "View teacher feedback",
    /**
    * @name ET.School.UI.Common.Const.text#listen
    * @description Listen
    */
    "listen": "Listen",
    /**
    * @name ET.School.UI.Common.Const.text#example
    * @description example
    */
    "example": "example",
    /**
    * @name ET.School.UI.Common.Const.text#answer
    * @description answer
    */
    "answer": "answer",
    /**
    * @name ET.School.UI.Common.Const.text#select
    * @description Select
    */
    "select": "Select",
    /**
    * @name ET.School.UI.Common.Const.text#more
    * @description more
    */
    "more": "more",
    /**
    * @name ET.School.UI.Common.Const.text#words
    * @description words
    */
    "words": "words",
    /**
    * @name ET.School.UI.Common.Const.text#word
    * @description word
    */
    "word": "word",
    /**
    * @name ET.School.UI.Common.Const.text#missing
    * @description missing
    */
    "missing": "missing",
    /**
    * @name ET.School.UI.Common.Const.text#my
    * @description my
    */
    "my": "my",
    /**
    * @name ET.School.UI.Common.Const.text#card_input
    * @description Input your answer..
    */
    "card_input": "Input your answer..",
    /**
    * @name ET.School.UI.Common.Const.text#card_record
    * @description Click to start record
    */
    "card_record": "Click to start record",
    /**
    * @name ET.School.UI.Common.Const.text#card_ques
    * @description Cards:
    */
    "card_ques": "Cards:",
    /**
    * @name ET.School.UI.Common.Const.text#card_pop
    * @description Skip this card?
    */
    "card_pop": "Skip this card?",
    /**
    * @name ET.School.UI.Common.Const.text#card_prac_mode
    * @description Practise Mode 
    */
    "card_prac_mode": "Practise Mode ",
    /**
    * @name ET.School.UI.Common.Const.text#card_exec_mode
    * @description Test Mode
    */
    "card_exec_mode": "Test Mode",
    /**
    * @name ET.School.UI.Common.Const.text#fcp_confirm
    * @description Do you want to finish practicing and take the test?
    */
    "fcp_confirm": "Do you want to finish practicing and take the test?",
    /**
    * @name ET.School.UI.Common.Const.text#typingDefault
    * @description Input your answer..
    */
    "typingDefault": "Input your answer..",
    /**
    * @name ET.School.UI.Common.Const.text#recordContent
    * @description The Activity uses EF Advanced Speech Recognition Softeware.<br/> Click "Install now" to install now,or "Skip activity" to do the activity without recording your voice.
    */
    "recordContent": 'The Activity uses EF Advanced Speech Recognition Softeware.<br/> Click "Install now" to install now,or "Skip activity" to do the activity without recording your voice.',
    "serverDoneContent": 'The Activity uses EF Recognition Server,but the server is not woking now.Please click "Skip activity" button to do the activity without recording your voice.',
    /**
    * @name ET.School.UI.Common.Const.text#typingContent
    * @description You have not completed all the questions in this activity.Are you sure you want to submit your results?
    */
    "typingContent": "You have not completed all the questions in this activity.Are you sure you want to submit your results?",
    /**
    * @name ET.School.UI.Common.Const.text#asrdownloadurl
    * @description http://www.ef.com
    */
    "asrdownloadurl": 'http://www.englishtown.com/_imgs/ASR/setups/' + (~window.navigator.platform.indexOf('Win') ? "EF_Advanced_Speech_Recognition_V4.exe" : "EF_ASR_MAC.pkg"),
    /**
    * @name ET.School.UI.Common.Const.text#title
    * @description What is her profession and personal interest?
    */
    "title": "What is her profession and personal interest?",
    /**
    * @name ET.School.UI.Common.Const.text#youranswer
    * @description Your answer
    */
    "youranswer": "Your answer",
    /**
    * @name ET.School.UI.Common.Const.text#question
    * @description Question
    */
    "question": "Question",
    /**
    * @name ET.School.UI.Common.Const.text#rps_answer
    * @description Answer:
    */
    "rps_answer": "Answer:",
    /**
    * @name ET.School.UI.Common.Const.text#correctanswer
    * @description Correct answer
    */
    "correctanswer": "Correct answer",
    /**
    * @name ET.School.UI.Common.Const.text#audseq_pop
    * @description Are you sure you want to continue
    */
    "audseq_pop": "Are you sure you want to continue",
    /**
    * @name ET.School.UI.Common.Const.text#audseq_preview
    * @description Preview
    */
    "audseq_preview": "Preview",
    /**
    * @name ET.School.UI.Common.Const.text#audseq_exit_preview
    * @description Exit Preview
    */
    "audseq_exit_preview": "Exit Preview",
    /**
    * @name ET.School.UI.Common.Const.text#audseq_fb_playall
    * @description Play all clips
    */
    "audseq_fb_playall": "Play all clips",
    /**
    * @name ET.School.UI.Common.Const.text#btntryagain
    * @description Try again
    */
    "btntryagain": "Try again",
    /**
    * @name ET.School.UI.Common.Const.text#asrTryTxt
    * @description Remaining attempts: 
    */
    "asrTryTxt": "Remaining attempts: ",
    /**
    * @name ET.School.UI.Common.Const.text#asrRecordTxt
    * @description Record the correct answer
    */
    "asrRecordTxt": "Record the correct answer",
    /**
    * @name ET.School.UI.Common.Const.text#asrRecordTxt_noasr
    * @description Select the correct answer
    */
    "asrRecordTxt_noasr": "Select the correct answer",
    /**
    * @name ET.School.UI.Common.Const.text#selectOptionTxt
    * @description Select an option above
    */
    "selectOptionTxt": "Select an option above",
    /**
    * @name ET.School.UI.Common.Const.text#aWaiting
    * @description Awaiting teacher's feedback...
    */
    "aWaiting": "Awaiting teacher's feedback...",
    /**
    * @name ET.School.UI.Common.Const.text#skipconfirm
    * @description You have not finished the activity. Are you sure you want to skip and go to the next one?
    */
    "skipconfirm": "You have not finished the activity. Are you sure you want to skip and go to the next one?",
    /**
    * @name ET.School.UI.Common.Const.text#subtitles
    * @description Subtitles:
    */
    "subtitles": "Subtitles:",
    /**
    * @name ET.School.UI.Common.Const.text#script
    * @description Script
    */
    "script": "Script",
    /**
    * @name ET.School.UI.Common.Const.text#classic
    * @description Classic
    */
    "classic": "Classic",
    /**
    * @name ET.School.UI.Common.Const.text#none
    * @description None
    */
    "none": "None",
    /**
    * @name ET.School.UI.Common.Const.text#seqAlert
    * @description Sorry,you have to drag all cards to the bottom container.
    */
    "seqAlert": "Sorry,you have to drag all cards to the bottom container.",
    /**
    * @name ET.School.UI.Common.Const.text#largescreen
    * @description Large screen
    */
    "largescreen": "Large screen",
    /**
    * @name ET.School.UI.Common.Const.text#smallscreen
    * @description Small screen
    */
    "smallscreen": "Small screen",
    /**
    * @name ET.School.UI.Common.Const.text#movietitle
    * @description Watch the movie and answer questions
    */
    "movietitle": "Watch the movie and answer questions",
    /**
    * @name ET.School.UI.Common.Const.text#playsection
    * @description Play section again.
    */
    "playsection": "Play section again.",
    /**
    * @name ET.School.UI.Common.Const.text#moviepop
    * @description Are you sure you want to skip this question?
    */
    "moviepop": "Are you sure you want to skip this question?",
    /**
    * @name ET.School.UI.Common.Const.text#mvwaiting
    * @description Loading movie...
    */
    "mvwaiting": "Loading movie...",
    /**
    * @name ET.School.UI.Common.Const.text#mvtip
    * @description Use subtitles to follow the dialog.
    */
    "mvtip": "Use subtitles to follow the dialog.",
    /**
    * @name ET.School.UI.Common.Const.text#recording
    * @description Click to stop recording
    */
    "recording": "Click to stop recording",
    /**
    * @name ET.School.UI.Common.Const.text#threeTimes
    * @description You have tried three times.
    */
    "threeTimes": "You have tried three times.",
    /**
    * @name ET.School.UI.Common.Const.text#takeTheTest
    * @description Take the test
    */
    "takeTheTest": "Take the test",
    /**
    * @name ET.School.UI.Common.Const.text#asr_error_voice_too_high
    * @description 'VOICE_TOO_HIGH'
    */
    "asr_error_voice_too_high": "'VOICE_TOO_HIGH'",
    /**
    * @name ET.School.UI.Common.Const.text#asr_error_voice_too_low
    * @description 'VOICE_TOO_LOW'
    */
    "asr_error_voice_too_low": "'VOICE_TOO_LOW'",
    /**
    * @name ET.School.UI.Common.Const.text#asr_error_voice_too_noisy
    * @description 'VOICE_TOO_NOISY'
    */
    "asr_error_voice_too_noisy": "'VOICE_TOO_NOISY'",
    /**
    * @name ET.School.UI.Common.Const.text#asr_error_unknown
    * @description 'UNKNOWN'
    */
    "asr_error_unknown": "'UNKNOWN'",
    /**
    * @name ET.School.UI.Common.Const.text#asr_error_dictionary_error
    * @description 'DICTIONARY_ERROR'
    */
    "asr_error_dictionary_error": "'DICTIONARY_ERROR'",
    /**
    * @name ET.School.UI.Common.Const.text#asr_error_not_recgnized
    * @description 'NOT_RECOGNIZED'
    */
    "asr_error_not_recgnized": "'NOT_RECOGNIZED'",
    /**
    * @name ET.School.UI.Common.Const.text#asr_try_over_times
    * @description You have tried 3 times!
    */
    "asr_try_over_times": "You have tried 3 times!",
    /**
    * @name ET.School.UI.Common.Const.text#asr_preparing
    * @description Preparing..
    */
    "asr_preparing": "Preparing..",
    /**
    * @name ET.School.UI.Common.Const.text#asr_processing
    * @description Precessing..
    */
    "asr_processing": "Precessing..",
    /**
    * @name ET.School.UI.Common.Const.text#asr_recordagain
    * @description Record again..
    */
    "asr_recordagain": "Record again!",
    /**
    * @name ET.School.UI.Common.Const.text#typingMaxLen
    * @description typing max length, default is 300.
    */
    "typingMaxLen": "300",
    /**
    * @name ET.School.UI.Common.Const.text#asr_noti_arrow_class
    * @description ASR notice arrow class, default is ".act-asr_noti_arrow"
    */
    "asr_noti_arrow_class": ".act-asr_noti_arrow",
    /**
    * @name ET.School.UI.Common.Const.text#asr_not_rec_result
    * @description ASR not recganize,default is "Your voice was not recognized."
    */
    "asr_not_rec_result": "Your voice was not recognized."
};
/**
* @namespace ET.School.UI.Common.Const.config
*/
ET.School.UI.Common.Const.config = {
    /**
    * @name ET.School.UI.Common.Const.config#fcp_rot_angle
    * @description The max angle of rotation.
    */
    "fcp_rot_angle": 8,
    /**
    * @name ET.School.UI.Common.Const.config#fc_score
    * @description The score for flash card, no used.
    */
    "fc_score": 70,
    /**
    * @name ET.School.UI.Common.Const.config#fc_input_maxlength
    * @description The max input length for flash card typing mode, default value is 61.
    */
    "fc_input_maxlength": 61,
    /**
    * @name ET.School.UI.Common.Const.config#asr_try_times
    * @description The default times for students to try in any ASR activities for ASR mode, the default value is 3.
    */
    "asr_try_times": 3, //this is default times for students to try,when the times will show a pop up
    /**
    * @name ET.School.UI.Common.Const.config#input_try_times
    * @description The default times for students to try in any ASR activities for Typing mode, the default value is -1(no limited).
    */
    "input_try_times": -1,
    /**
    * @name ET.School.UI.Common.Const.config#excellentGradeMax
    * @description The max score for "excellent".
    */
    "excellentGradeMax": 100,
    /**
    * @name ET.School.UI.Common.Const.config#excellentGradeMin
    * @description The min score for "excellent".
    */
    "excellentGradeMin": 70 + (100 - 70) / 2,
    /**
    * @name ET.School.UI.Common.Const.config#tryagainGrade
    * @description The max score for "try again".
    */
    "tryagainGrade": 70,
    /**
    * @name ET.School.UI.Common.Const.config#goodGradeMin
    * @description The min score for "good".
    */
    "goodGradeMin": 70,
    /**
    * @name ET.School.UI.Common.Const.config#asrGoodGrade
    * @description The min score for "good" of ASR recognition.
    */
    "asrGoodGrade": 70,
    /**
    * @name ET.School.UI.Common.Const.config#goodGradeMax
    * @description The max score for "good".
    */
    "goodGradeMax": 70 + (100 - 70) / 2,
    /**
    * @name ET.School.UI.Common.Const.config#itemRandom
    * @description The random flag for ItemBank item sorting.
    */
    "itemRandom": true,
    /**
    * @name ET.School.UI.Common.Const.config#recordMaxLength
    * @description max length of recording Unit(ms).
    */
    "recordMaxLength": 10000,
    /**
    * @name ET.School.UI.Common.Const.config#lastTalkpalAXVersion
    * @description the old version of talkpal activex.
    */
    "lastTalkpalAXVersion": "4.3.0.0",
    /**
    * @name ET.School.UI.Common.Const.config#asrOldLocalMode/asrNewLocalMode/asrNewServerMode
    * @description asr mode.
    */
    "asrOldLocalMode": "asr-old-local",
    "asrNewLocalMode": "asr-new-local",
    "asrNewServerMode": "asr-new-server",
    /**
    * @name ET.School.UI.Common.Const.config#Browser
    * @description assert browser
    */
    "isIE6": /ie 6/i.test(navigator.userAgent),
    "isIE7": /ie 7/i.test(navigator.userAgent),
    "isIE8": /ie 8/i.test(navigator.userAgent),
    "isIE9": /ie 9/i.test(navigator.userAgent),
    "isIpad": /ipad/i.test(navigator.userAgent),
    "isOpera": /opera/i.test(navigator.userAgent),
    "isIE": navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1 && !/opera/i.test(navigator.userAgent),
    "isChrome": /chrome/i.test(navigator.userAgent),
    "isFirefox": /firefox/i.test(navigator.userAgent),
    "isSafari": navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1
};
/**
* @namespace ET.School.UI.Common.Const.selector
*/
ET.School.UI.Common.Const.selector = {
    /**
    * @name ET.School.UI.Common.Const.selector#activity
    * @description Selector for .activity element.
    */
    "activity": ".activity",
    /**
    * @name ET.School.UI.Common.Const.selector#activityContent
    * @description Selector for #act-tp.
    */
    "activityContent": "#act-tp",
    /**
    * @name ET.School.UI.Common.Const.selector#activityBottom
    * @description Selector for #act-bt.
    */
    "activityBottom": "#act-bt"
};

/**
* use $j to replace $ of jQuery selector.
*/
var $j = jQuery.noConflict();

$j(document).bind("selectstart", function (e) {
    // disable the select shadow when drag in iPad
    return !ET.School.UI.Common.Touch.isiPad();
});
ET.School.UI.Common.ItemBank._sort = function (a, b) {
    return b.Priority - a.Priority;
};

/**
* Returns whether the two objects are equeues.
* @param o1 {object} object 1
* @param o2 {object} object 2
* @returns true or false
*/
ET.School.UI.Common.ItemBank.compareObject = function (o1, o2) {
    if (o1 === o2) {
        return true;
    }
    if (o1 === undefined || o1 === null || typeof (o1) !== "object") {
        return false;
    }
    if (o2 === undefined || o2 === null || typeof (o2) !== "object") {
        return false;
    }
    var _l1 = 0;
    var _l2 = 0;
    for (var i in o1) {
        _l1++;
    }
    for (var i in o2) {
        _l2++;
    }
    if (_l1 !== _l2) {
        return false;
    }
    if (o1.constructor === o2.constructor) {
        for (var i in o1) {
            if (typeof (o1[i]) === "object") {
                if (!ET.School.UI.Common.ItemBank.compareObject(o1[i], o2[i]))
                    return false;
            }
            else
                if (o1[i] !== o2[i]) {
                    return false;
                }
        }
        return true;
    }
    return false;
};

/**
* Returns whether the element contains in arr
* @param arr {Array} The element array for checking
* @param element {object} element
* @returns true or false
*/
ET.School.UI.Common.ItemBank.contains = function (arr, element) {
    var _result = false;
    for (var i = 0; i < arr.length; i++) {
        if (!isNaN(i)) {
            if (typeof (element) === "object" && ET.School.UI.Common.ItemBank.compareObject(arr[i], element)) {
                _result = true;
                break;
            }
            else
                if (arr[i] === element) {
                    _result = true;
                    break;
                }
        }
    }
    return _result;

};
/**
* delete element array which is existed in another array
* @param arrSource {Array} The source array
* @param elementArr {Array} The array for deleting
*/
ET.School.UI.Common.ItemBank.deleteElementArr = function (arrSource, elementArr) {

    for (var i = 0; i < elementArr.length; i++) {
        for (var _index = 0; _index < arrSource.length; _index++) {
            if (ET.School.UI.Common.ItemBank.compareObject(arrSource[_index], elementArr[i])) {
                arrSource.splice(_index, 1);
                break;
            }
        }
    }
};

/**
* The item back core logic.
* @param data {object} The data parameter should be like this:
<pre>
{    
Items: [],
NoToDis: "",
InCorrItems: [],
CorrItems: []
}
</pre>
* @returns {Array} The item list for Bank.
*/
ET.School.UI.Common.ItemBank.selectItems = function (data) {
    var _index;
    var _arrResult = []; //result for return 
    var _arrTemp = []; //save  temporary data  from jsondata.Items which are sorted by Priority  
    var _arrCorr = []; //correct answer element in jsondata.Items and sorted by Priority
    var _iErrDis = 0; //numbers of error answers for array
    var _itemCorr = 0; //current numbers of correct answers pushed to _arrResult
    var _itemErr = 0; //current numbers of error answers pushed to _arrResult    
    var _flag = false;
    ET.School.UI.Common.Const.config.itemRandom = arguments[1] === undefined ? true : arguments[1];
    if (data.NoCorrToDis && parseInt(data.NoCorrToDis, 10) < 0 || parseInt(data.NoToDis, 10) < 0) {
        return data;
    }
    for (var i = 0; i < data.Items.length; i++) {
        if (data.Items[i].Correct === 1) {
            _flag = true;
        }
        else {
            _flag = false;
            break;
        }
    }
    if (_flag) {
        for (var i = 0; i < data.Items.length; i++) {
            data.Items[i].Correct = undefined;
        }
    }
    if (isNaN(data.NoCorrToDis))//when card etc.
    {
        data.CorrItems = [];
        data.InCorrItems = [];
        data.Items.sort(ET.School.UI.Common.ItemBank._sort);
        for (var i = 0; i < data.Items.length; i++) {
            if (data.Items[i].Correct === undefined) {
                _arrTemp.push(data.Items[i]);
            }
            else
                if (data.Items[i].Correct === 1) {
                    data.CorrItems.push(data.Items[i]);
                }
                else
                    if (data.Items[i].Correct === 0) {
                        data.InCorrItems.push(data.Items[i]);
                    }
        }
        //copy data.items whitch are ordered  by Priority
        //push element from InCorrItems order by  Priority
        if (data.InCorrItems !== undefined) {
            for (var _index = 0; _index < data.InCorrItems.length; _index++) {
                if (_arrResult.push(data.InCorrItems[_index]) === parseInt(data.NoToDis, 10)) {
                    return _arrResult.sort(ET.School.UI.Common.Behavior._ItemBankSort);
                }
            }
            //ET.School.UI.Common.ItemBank.deleteElementArr(_arrTemp, data.InCorrItems);
        }

        //push element from _arrTemp which is not contain CorrItems and  InCorrItems order by  Priority
        for (var _index = 0; _index < _arrTemp.length; _index++) {
            if (_arrResult.push(_arrTemp[_index]) === parseInt(data.NoToDis, 10)) {
                return _arrResult.sort(ET.School.UI.Common.Behavior._ItemBankSort);
            }
        }
        //push element from CorrItems 
        if (data.CorrItems !== undefined) {
            for (var _index = 0; _index < data.CorrItems.length; _index++) {
                if (_arrResult.push(data.CorrItems[_index]) === parseInt(data.NoToDis, 10)) {
                    return _arrResult.sort(ET.School.UI.Common.Behavior._ItemBankSort);
                }
            }
        }
        return _arrResult.sort(ET.School.UI.Common.Behavior._ItemBankSort);
    }
    else {//when choice,select etc.
        _iErrDis = parseInt(data.NoToDis, 10) - parseInt(data.NoCorrToDis, 10);

        data.CorrItems = [];
        data.InCorrItems = [];
        data.Items.sort(ET.School.UI.Common.ItemBank._sort);
        for (var index = 0; index < data.Items.length; index++) {
            switch (data.Items[index].Correct) {
                case undefined:
                    if (data.Items[index].Ans === "1") {
                        _arrCorr.push(data.Items[index]);
                    }
                    else {
                        _arrTemp.push(data.Items[index]);
                    }
                    break;
                case 1:
                    data.CorrItems.push(data.Items[index]);
                    break;
                case 0:
                    data.InCorrItems.push(data.Items[index]);
                    break;
            }
        }
        //slelect correct items
        //push data from InCorrItems
        for (var index = 0; index < data.InCorrItems.length; index++) {
            if (data.InCorrItems[index].Ans === "1") {
                if (_itemCorr !== parseInt(data.NoCorrToDis, 10)) {
                    _arrResult.push(data.InCorrItems[index]);
                    _itemCorr++;
                }
            }
        }

        if (_itemCorr < parseInt(data.NoCorrToDis, 10)) {
            //push  correct data from _arrCorr 
            for (var index = 0; index < _arrCorr.length; index++) {
                if (_itemCorr === parseInt(data.NoCorrToDis, 10)) {
                    break;
                }
                else {
                    _arrResult.push(_arrCorr[index]);
                    _itemCorr++;
                }
            }
        }

        for (var index = 0; index < data.CorrItems.length; index++) {
            if (data.CorrItems[index].Ans === "1") {
                if (_itemCorr < parseInt(data.NoCorrToDis, 10)) {
                    _arrResult.push(data.CorrItems[index]);
                    _itemCorr++;
                }
            }
        }
        //end select correct items
        if (_itemCorr < parseInt(data.NoCorrToDis, 10)) {
            _iErrDis = parseInt(data.NoToDis, 10) - _arrResult.length;
        }
        //select incorrect items
        for (var index = 0; index < data.InCorrItems.length; index++) {
            if (data.InCorrItems[index].Ans === "0") {
                if (_itemErr !== _iErrDis) {
                    _arrResult.push(data.InCorrItems[index]);
                    _itemErr++;
                }
            }
        }

        if (_itemErr < _iErrDis) {
            //push  error data from _arrTemp 
            for (var index = 0; index < _arrTemp.length; index++) {

                if (_itemErr === _iErrDis) {
                    break;
                }
                else {
                    _arrResult.push(_arrTemp[index]);
                    _itemErr++;
                }
            }

        }

        for (var index = 0; index < data.CorrItems.length; index++) {
            if (data.CorrItems[index].Ans === "0") {
                if (_itemErr !== _iErrDis) {
                    _arrResult.push(data.CorrItems[index]);
                    _itemErr++;
                }
            }
        }
        //end select incorrect items


        _arrResult = _arrResult.sort(ET.School.UI.Common.Behavior._ItemBankSort);
        return _arrResult;
    }
};
ET.School.UI.Common.Behavior._ItemBankSort = function () {
    if (ET.School.UI.Common.Const.config.itemRandom) {
        return Math.random() > 0.5 ? -1 : 1;
    }
    else {
        return 0;
    }
}
/**
* Rrotate the elements by the angle. If the browser is IE, do nothing.
* @param {Object} elements the jQuery emelents.
* @param {int} angle The angle value for rotation.
*/
ET.School.UI.Common.Behavior.rotate = function (elements, angle) {
    if ($j.browser.msie) {
        return;
    }
    var _maxSetAngle = angle || 5;
    elements.each(function () {
        angle = Math.random();
        angle = Math.round(angle * _maxSetAngle * 2) - _maxSetAngle;
        $j(this).transform({
            rotate: angle
        });
    });

};
/**
* Add round css to the jQuery elements
* @param {jQuery} element jQuery element for adding
* @param {int} size border radius size
*/
ET.School.UI.Common.Behavior.addRoundCss = function (element, size) {
    if (/webkit/i.test(navigator.userAgent)) {
        element.css("-webkit-border-radius", size ? size : "5px");
    }
    else
        if (!/ie/i.test(navigator.userAgent)) {
            element.css("-moz-border-radius", size ? size : "5px");
        }
        else if (/ie 9/i.test(navigator.userAgent)) {
            element.css("border-radius", size ? size : "5px");
        }
};

/**
* Let the activity content vertical algin middle.
*/
ET.School.UI.Common.fitConentVAlign = function () {
    window.setTimeout("ET.School.UI.Common._fitConentVAlign()", 50);
};
ET.School.UI.Common._fitConentVAlign = function () {
    var _selector = ET.School.UI.Common.Const.selector;
    var _topHeight = $j(_selector.activityContent).height();
    var _bottomHeight = $j(_selector.activityBottom).height();
    var _marginTop = Math.round((450 - 20 - _topHeight - _bottomHeight) / 2);
    if (ET.School.UI.Common.Touch.isiPad()) {
        if (_marginTop > 5) {
            $j(_selector.activityContent).css("margin-top", _marginTop + "px");
            $j(_selector.activity).css("height", "");
        }
        else {
            $j(_selector.activity).height(_topHeight + _bottomHeight + 10 + 10 + 20);
            $j(_selector.activityContent).css("margin", "10px auto");
        }
    }
    else {
        if (_marginTop > 5) {
            $j(_selector.activityContent).css("margin-top", _marginTop + "px");
            $j(_selector.activity).css("height", "");
        }
        else {
            $j(_selector.activity).height(_topHeight + _bottomHeight + 10 + 10 + 20);
            $j(_selector.activityContent).css("margin", "10px auto");
        }
    }
    window.setTimeout(function () { ET.School.UI.Common.showActivity(); }, 0);
};
/**
*show activity
*/
ET.School.UI.Common.showActivity = function () {
    var _selector = ET.School.UI.Common.Const.selector;
    $j(_selector.activityContent).removeClass("act-hidden");
    $j(_selector.activityBottom).removeClass("act-hidden");
    if (ET.School.UI.Common.Buttons.setting.isIe6) {
        $j(_selector.activityBottom).css("zoom", "1");
        if ($j("#activity_main").height() < 450) {
            $j("#activity_main").height(450 + "px");
        }
    }
};

/**
* Build new object from the paramenter data
* @param {Object} data The source object for coping.
* @returns {Object} new object copied.
*/
ET.School.UI.Common.buildNewObj = function (data) {
    var _JSONStr = JSON.stringify(data);
    return JSON.parse(_JSONStr);
};

/**
* Skip activity
* @param {int} id activity ID
*/
ET.School.UI.Common.skipActivity = function (id) {
    ET.School.UI.Common.Popup.onYesClick = function () {
        ET.School.UI.Common.Popup.close();
        ET.School.UI.Common.purge($j(".activity"));
        $j(".activity").children().remove();
        skipActivity(parseInt(id, 10));
    };
    ET.School.UI.Common.Popup.onNoClick = function () {
        ET.School.UI.Common.Popup.close();
    };
    ET.School.UI.Common.Popup.open(ET.School.UI.Common.Const.text.skipconfirm);
    return false;
};
/**
* Remove the related envet handler for the jQuery element.
* @param {Object} jqueryElement the jQuery element.
*/
ET.School.UI.Common.purge = function (jqueryElement) {
    if (typeof (jqueryElement) !== "object") {
        ET.School.UI.Common._purge(jqueryElement);
        return;
    }
    var _len = jqueryElement.length;
    if (_len === 0) {
        return;
    }
    var i;
    for (i = 0; i < _len; i += 1) {
        ET.School.UI.Common._purge(jqueryElement[i]);
    }
};

ET.School.UI.Common._purge = function (domElement) {
    if (!domElement) {
        return;
    }
    var _attr = domElement.attributes, i, _len, _name;
    if (_attr) {
        _len = _attr.length;
        for (i = 0; i < _len; i += 1) {
            _name = _attr[i].name;
            if (typeof domElement[_name] === 'function') {
                domElement[_name] = null;
            }
        }
    }
    _attr = domElement.childNodes;
    if (_attr) {
        _len = _attr.length;
        for (i = 0; i < _len; i += 1) {
            ET.School.UI.Common._purge(domElement.childNodes[i]);
        }
    }
}
/**
* Compute score by parameter resultArr
* @param {Object} resultArr like 
* <pre>
* [["ad dd dfw aw c!" //my data
,"ad dd dfw aw c!"//correct data
,"right"//right or wrong,this is optional
],...]
* </pre>
*/
ET.School.UI.Common.computeScoreByStr = function (resultArr) {
    var _posScore = []; //position score
    var _seqScore = []; //sequence score
    var _corrData = "";
    var _myData = [];
    var _score = 0;
    for (var i = 0; i < resultArr.length; i++) {
        _corrData = resultArr[i][1];
        _myData = resultArr[i][0].split(" ");
        var _startIndex = 0;
        var _seqCount = 0;
        var _posCount = 0;
        while (_startIndex < _myData.length) {
            var _compare;
            for (var _step = _startIndex + 1; _step < _myData.length; _step++) {
                _compare = _myData.slice(_startIndex, _step + 1).join(" ");
                if (_corrData.indexOf(_compare) === -1) {
                    break;
                }
                if (_seqCount < _step - _startIndex + 1) {
                    _seqCount = _step - _startIndex + 1;
                }
            }
            _startIndex++;
        }
        _seqScore.push(_seqCount / _myData.length);
        var _correctDataArr = _corrData.split(" ");
        for (var j = 0; j < _myData.length; j++) {
            if (_myData[j] === _correctDataArr[j]) {
                _posCount++;
            }
        }
        _posScore.push(_posCount / _myData.length);
    }

    for (var m = 0; m < resultArr.length; m++) {
        _score += (_seqScore[m] >= _posScore[m] ? _seqScore[m] : _posScore[m]);
    }
    return Math.round(_score * 100 / resultArr.length);
}
//resultArr is like [1,4,3,2,5]
/**
* Compute score by parameter resultArr
* @param {Object} resultArr like 
* <pre>
* [1,4,3,2,5] // the number is the correct position.
* </pre>
*/
ET.School.UI.Common.computeScore = function (resultArr) {
    var _result = resultArr;
    var _posScore = 0; //position score
    var _seqScore = []; //sequence score
    for (var i = 0; i < _result.length; i++) {
        if (parseInt(_result[i], 10) - 1 === i) {
            _posScore++;
        }
        _seqScore[i] = 1;
        for (var j = i + 1; j < _result.length; j++) {
            if (parseInt(_result[j], 10) === parseInt(_result[j - 1], 10) + 1) {
                _seqScore[i]++;
            }
            else {
                if (_seqScore[i] === 1) {
                    _seqScore[i] = 0;
                }
                break;
            }
        }
        if (_seqScore[i] === 1) {
            _seqScore[i] = 0;
        }
    }
    _seqScore.sort(function (a, b) {
        return b - a;
    });
    return Math.round(Math.max(_posScore, _seqScore[0]) * 100 / _result.length);
};
/**
* ASR delegate function
* @param {Object} data ASR data
* @param {function} callback ASR callback function, when ASR is completed, this function will be called. 
* @param {Object} acttype Activity type, They're "ms","rps","lc" and "cp".
*/
ET.School.UI.Common.asrDelegate = function (data, callback, acttype) {
    var _cdata = data.Prons.CDATA || "";
    var _txt = [];
    var _result = [];
    var autoStopTime = (arguments[3] && typeof arguments[3]==='number') ? arguments[3] : null;//asr auto stop time
    switch (acttype) {
        case "ms":
            _txtData = ((data.Phrase || data.Title) === null ? "" : (data.Phrase || data.Title));
            break;
        case "rps":
            _txtData = (data.Txt === null ? "" : data.Txt);
            break;
        case "lc":
            _txtData = (data.PhrEL == null ? "" : data.PhrEL);
            break;
        case "cp":
            _txtData = (data.Title == null ? "" : data.Title);
        default:
            break;
    }
    _txt = _txtData.replace("-", " - ").replace(/\s+/g, " ").split(" ");
    ET.School.UI.Common.Player.isRecording = true;
    setTimeout(function () {
        if (!_cdata) {
            if (ET.School.UI.Common.Touch.isiPad()) {
                ET.NA.ASR.startRecordingDelegate(function () {
                    ET.School.UI.Common._asrCallback([], callback, _txt);
                });
            }
            else {
                ET.NA.ASR.startRecording(function () {
                    ET.School.UI.Common._asrCallback([], callback, _txt);
                }, autoStopTime);
            }
            return;
        }
        ET.NA.ASR.startRecognizeRecording(_cdata, function (data) {
            ET.School.UI.Common._asrCallback(data, callback, _txt);
        });
    }, 1);
};

ET.School.UI.Common._asrCallback = function (data, callback, txt) {
    _result = ET.School.UI.Common.buildNewObj(data);
    if (_result.length === 0) {
        txt = txt.join(" ").replace(/\s{1}-\s{1}/g, "-").split(" ");
        var _sentence = {
            sentence: txt.join(" "),
            score: 0,
            words: []
        };
        for (var i = 0; i < txt.length; i++) {
            _sentence.words.push({
                word: txt[i],
                score: 0
            });
        }
        _result.push(_sentence);
    } else {
        _result[0].sentence = txt.join(" ");
        for (var i = 0, len = _result[0].words.length; i < len; i++) {
            if (txt[i]) {
                _result[0].words[i].word = txt[i];
                if (txt[i + 1] && txt[i + 1] === "-") {
                    _result[0].words[i].word += "-";
                    if (txt[i + 2]) {
                        _result[0].words[i].word += txt[i + 2];
                        if (_result[0].words[i + 1]) {
                            _result[0].words[i].score = (_result[0].words[i].score + _result[0].words[i + 1].score) / 2;
                        }
                    }
                    txt.splice(i + 1, 2);
                }
            } else {
                _result[0].words.splice(i, 1);
            }
        }
    }
    if (callback) {
        callback(_result);
    }
    ET.School.UI.Common.Player.isRecording = false;
};
/**
* ASR error popup
* @param {Object} result ASR error code
* @param {Object} callBack The callback function will be called when the popup closed.
*/
ET.School.UI.Common.asrErrorPop = function (result, callBack) {
    if (result) {
        switch (result.toUpperCase()) {
            case "VOICE_TOO_SLOW":
                ET.School.UI.Common._openForASR(ET.School.UI.Common.Const.text.asr_error_voice_too_slow, callBack);
                break;
            case "VOICE_TOO_FAST":
                ET.School.UI.Common._openForASR(ET.School.UI.Common.Const.text.asr_error_voice_too_fast, callBack);
                break;
            case "VOICE_TOO_HIGH":
                ET.School.UI.Common._openForASR(ET.School.UI.Common.Const.text.asr_error_voice_too_high, callBack);
                break;
            case "VOICE_TOO_LOW":
                ET.School.UI.Common._openForASR(ET.School.UI.Common.Const.text.asr_error_voice_too_low, callBack);
                break;
            case "VOICE_TOO_NOISY":
                ET.School.UI.Common._openForASR(ET.School.UI.Common.Const.text.asr_error_voice_too_noisy, callBack);
                break;
            case "UNKNOWN":
                ET.School.UI.Common._openForASR(ET.School.UI.Common.Const.text.asr_error_unknown, callBack);
                break;            
            default:
                if (!ET.School.UI.Common.Touch.isiPad() && result.trim() != "") {
                    // show pc version ASR message.
                    ET.School.UI.Common._openForASR(result, callBack);
                }
                else {
                    if (callBack) {
                        callBack([]);
                    }
                }
                break;
        }
    } else {
        if (callBack) {
            callBack([]);
        }
    }
};


ET.School.UI.Common._openForASR = function (content, callBack) {
    var recordDiv = $j(".act-player_rd_n");
    if (!recordDiv[0]) {
        recordDiv = $j(".act-player_rd_d");
    }

    var asrMessageDiv = $j("#act-asr_noti_wrap");
    var asrMessageArrow = asrMessageDiv.find(".act-asr_noti_arrow");

    if (!ET.School.UI.Common.Const.config.isIpad) {
        $j(".act-asr_rec_popup_msg_expand").toggleClass('act-hide');
        $j(".act-asr_rec_popup_msg_detail").text(content);
        $j(".act-asr_rec_popup_msg_title").text(ET.School.UI.Common.Const.text.asr_recordagain);
        ET.NA.ASR.showASRPopMessage(true);
        if (callBack) {
            callBack([]);
        }
    } else {
        if (asrMessageDiv[0]) {
            asrMessageDiv.find(".act-asr_noti_message").text(content);
            setTimeout(function () {
                asrMessageDiv.removeClass("act-hide");
                var wrapperTop = $j("#wrapper").offset().top;
                var wrapperLeft = $j("#wrapper").offset().left;
                var divTop = (recordDiv.offset().top + recordDiv.outerHeight() / 2) - asrMessageDiv.outerHeight() / 2;
                var divLeft = recordDiv.offset().left - asrMessageDiv.outerWidth();
                asrMessageDiv.css({ "top": divTop - wrapperTop, "left": divLeft - wrapperLeft });

                var arrowTop = (asrMessageDiv.outerHeight() - asrMessageArrow.outerHeight()) / 2;
                asrMessageArrow.css("top", arrowTop);
            }, 0);

            if (callBack) {
                callBack([]);
            }

            //click to close message div
            $j('body,#activity,#my_unit,#top,#bc_lesson,#breadcrumb,#tablet_header,.list_activity li a,#bc_level,#bc_unit').click(Delegate.create(this, function () {
                ET.NA.ASR.hideASRNotification();
            }));
        }
        else {
            ET.School.UI.Common.Popup.onYesClick = function () {
                ET.School.UI.Common.Popup.close();
                if (callBack) {
                    callBack([]);
                }
            };
            ET.School.UI.Common.Popup.onNoClick = function () {
                ET.School.UI.Common.Popup.close();
                if (callBack) {
                    callBack([]);
                }
            };
            ET.School.UI.Common.Popup.open(content, "", ET.School.UI.Common.Const.text.ok);
            $j("#act-popup_btnno").remove();
            $j("#act-popup_close").unbind("click");
            $j("#act-popup_close").click(function () {
                ET.School.UI.Common.Popup.close();
                if (callBack) {
                    callBack([]);
                }
            });
        }
    }

};
/**
* Load jtemplate
* @param {jQuery} elem The element for render
* @param {String} URL The jtemplate url
* @param {Object} data The data for jtemplate binding 
* @param {Boolen} include include parameter for setTemplateElement of jTemplates 
* @param {Object} setting setting parameter for setTemplateElement of jTemplates 
*/
ET.School.UI.Common.loadTemplate = function (elem, URL, data, include, setting) {
    ET.School.UI.Common.purge(elem.children());
    $j.ajaxSetup({
        cache: true
    });
    if (/ie 6/i.test(navigator.userAgent)) {
        document.execCommand("BackgroundImageCache", false, true);
    }
    if (typeof (isJTempOnPage) !== "undefined" && isJTempOnPage) {
        var jTemp_id = getJTemp_idByPath(URL);
        elem.setTemplateElement(jTemp_id, include, setting);
    } else {
        if (typeof (window.siteVersion) === "undefined") {
            window.siteVersion = "development";
        }
        elem.setTemplateURL(URL + "?siteversion=" + window.siteVersion, include, setting);
    }
    elem.processTemplate(data);
};

/*
Parameters:
{string} url_
URL to template
{array} includes
Array of included templates.
{object} settings
Settings. (see Template)
Returns:
{Template}
*/
/**
* Load templates to text 
* @param {String} URL The jtemplate url
* @param {Object} data The data for jtemplate binding 
* @param {Object} proceeSetting setting parameter for processTemplateToText of jTemplates 
* @param {Object} include include parameter for jTemplates 
* @param {Object} createSetting setting parameter for createTemplate of jTemplates
* returns {String}The html string 
*/
ET.School.UI.Common.loadTemplateToText = function (URL, data, proceeSetting, include, createSetting) {
    var _templateText = "";
    $j.ajaxSetup({
        cache: true
    });
    if (/ie 6/i.test(navigator.userAgent)) {
        document.execCommand("BackgroundImageCache", false, true);
    }
    var _tem;
    if (typeof (isJTempOnPage) !== "undefined" && isJTempOnPage) {
        var jTemp_id = getJTemp_idByPath(URL);
        _tem = $j.createTemplate($j("#" + jTemp_id).html().htmlDecode(), include, createSetting);
    } else {
        if (typeof (window.siteVersion) === "undefined") {
            window.siteVersion = "development";
        }
        _tem = $j.createTemplateURL(URL + "?siteversion=" + window.siteVersion, include, createSetting);
    }
    _templateText = $j.processTemplateToText(_tem, data, proceeSetting);
    return _templateText;
};
/**
* Get click event string
* returns if iPad "touchstart" else "click"
*/
ET.School.UI.Common.getClickEvent = function () {
    if (ET.School.UI.Common.Touch.isiPad()) {
        return "touchstart";
    } else {
        return "click";
    }
};
/**
* try more event handler for all activities
*/
ET.School.UI.Activity.tryMore = function () {
    if (ET && ET.Configuration && ET.School && ET.School.MainApp) {
        var activityEngineView = ET.Configuration.AppSettings.getView(ET.School.MainApp.UI.Views.IActivityEngineView);
        activityEngineView.showCommonSourceBar();
    }
};
/**
* check need show play back button in asr activity
*/
ET.School.UI.Common.needShowPlayback = function () {
    if (ET.School.UI.Common.Touch.isiPad()) {
        return true;
    } else {
        return ET.NA.ASR.needHidePlayback();
    }
};
/************************************************************************/
/* check whether flash has installed                                    */
/************************************************************************/
ET.School.UI.Common.flashChecker = function () {
    var hasFlash = 0;
    var flashVersion = 0;
    var isIE = /*@cc_on!@*/0;
    if (isIE) {
        var swf = new ActiveXObject('ShockWaveFlash.ShockWaveFlash');
        if (swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0], 10);
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var desflash = swf.description.split(" ");
                for (var i = 0; i < desflash.length; i++) {
                    if (isNaN(desflash[i])) continue;
                    flashVersion = parseInt(desflash[i], 10);
                }
            }
        }
    }
    return { hasInstall: hasFlash || swfobject.hasFlashPlayerVersion("10"), version: flashVersion || swfobject.getFlashPlayerVersion().major };
}
/*check wheither insist the specific style,eg: backgroundSize */
ET.School.UI.Common.cssCheck = function (cssText) {
   var style = document.createElement('cssText').style, domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
   ucProp = cssText.charAt(0).toUpperCase() + cssText.substr(1),
   props = (cssText + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
    for (var i in props) {
        if (style[props[i]] !== undefined) {
            return true;
        }
    }
    return false;
}
