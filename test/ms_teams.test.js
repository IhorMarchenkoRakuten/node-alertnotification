const dotenv = require('dotenv').config();
const axios = require('axios');
const { rest } = require('msw');
const { setupServer } = require('msw/node');

const MsTeamsMessageCard = require('../lib/ms_teams');

const mockServer = setupServer(
    rest.post(process.env.MS_TEAMS_WEBHOOK, (req, res, ctx) => {
        return res(ctx.json({
            status: 200,
        }))
    })
)

beforeAll(() => mockServer.listen())
afterAll(() => mockServer.close())

test('should create object', () => {
    let err = new Error("Test MsTeams")
    let msTeamsCard = new MsTeamsMessageCard(err)
    expect(msTeamsCard.messageCard.summary).toBe(process.env.MS_TEAMS_CARD_SUBJECT)
    expect(msTeamsCard.messageCard["@context"]).toBe("http://schema.org/extensions")
    expect(msTeamsCard.messageCard["@type"]).toBe("MessageCard")
    expect(msTeamsCard.messageCard.themeColor).toBe(process.env.ALERT_THEME_COLOR)
    expect(msTeamsCard.messageCard.title).toBe(process.env.ALERT_CARD_SUBJECT)
})

test('should sending message card ', async() => {
    let err = new Error("Test MsTeams");
    let msTeamsCard = new MsTeamsMessageCard(err);
    const status = await msTeamsCard.sendMessageCard();
    expect(status).toBe(200);
})