import { google } from "googleapis";



const SHEETNAME = 'CAST'

const RANGE = `${SHEETNAME}!A:Z`;

const SHEET_ID = '1mL3Gx1u-9pBJaj75a0HhsHPkgkQJZKMOtcoIHUAjCKM' //process.env.SHEET_ID

const HEADERS = [
    'Owner',
    'PickRank',
    'GlobalPickRank',
    'Name',
    'OriginalTribe',
    'EliminatedEpisode',
    'VotedOutNumber',
    'Comments',
]


export interface Survivor {
    Name: string
    OriginalTribe: 'Vati' | 'Ika' | 'Taku'
    EliminatedEpisode: number
    VotedOutNumber: number
    Comments: string
    Owner: 'Cara' | 'Simey' | 'Ryan' | 'Nielen' | 'Unpicked'
    PickRank: number
    GlobalPickRank: number
    row: number
}

export async function getAll(): Promise<Survivor[]> {
    const sheets = await getSheetsService();

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
    });

    const values = response.data.values;
    return sheetsArrayToObjectArray(values).map((x, i) => ({...x, row: i + 2})) as Survivor[];
}


export async function update(survivor: Survivor ) {
    const sheets = await getSheetsService();

    console.log({update: survivor})
    const values = [HEADERS.map((key) => survivor[key] || '')];
    

    

    const response = await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEETNAME}!A${survivor.row}`,
        valueInputOption: "USER_ENTERED",

        requestBody: {
            values,
        },
    });
    return response;

}


async function getSheetsService() {
    const auth = await google.auth.getClient({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    return sheets;
}

function sheetsArrayToObjectArray([headers, ...rows]: any[][]) {
    return rows.map((row) => {
        const result = {};
        headers.forEach((key, i) => {
            result[key] = row[i];
        });
        return result;
    });
}

