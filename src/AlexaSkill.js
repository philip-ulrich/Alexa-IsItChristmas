'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.f4567f4a-f4c0-4d7a-8314-27fc3c8383e2";

const languageStrings = {
    'en-US': {
        translation: {
            DENY: [
                'No, it is not Christmas.',
                'No.',
                'Indeed it is not.',
                'I am sorry, but no.'
            ],
            ACCEPT: [
                'Yes, it is Christmas.',
                'Yes.',
                'Indeed it is.'
            ],
            SKILL_NAME: 'Is It Christmas?',
            HELP_MESSAGE: 'You can ask me for Christmas.',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetChristmas');
    },
    'GetChristmas': function () {
        var today = new Date();
        
        if (today.getMonth() == 11 && today.getDate() == 25) {
            const respArr = this.t('ACCEPT');
            const respIndex = Math.floor(Math.random() * respArr.length);
            const randomResp = respArr[respIndex];

            const speechOutput = randomResp;
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomResp);
        }
        else {
            const respArr = this.t('DENY');
            const respIndex = Math.floor(Math.random() * respArr.length);
            const randomResp = respArr[respIndex];

            const speechOutput = randomResp;
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomResp);
        }
        
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
