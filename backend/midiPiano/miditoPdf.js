// miditoPdf.js

import { exec } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

const musescorePath = 'C:\\Users\\user\\bin\\MuseScore4.exe';
const outputDir = 'backend/midiPiano/pdfs/';

export async function convertMidiToPdf(midiFilePath, pdfsPath) {
    const midiPath = path.resolve(midiFilePath);
    const outputFileName = `output_${Date.now()}.pdf`;
    const outputPath = path.resolve(pdfsPath, outputFileName);

    // ✅ 파일 경로 디버깅
    console.log(`🎵 MIDI 파일 읽는 중: ${midiPath}`);
    console.log(`🛠 실행 명령어: "${musescorePath}" -o "${outputPath}" "${midiPath}"`);

    // ✅ MIDI 파일이 존재하는지 확인
    try {
        await fs.access(midiPath);
    } catch (error) {
        console.error(`🚨 MIDI 파일 없음: ${midiPath}`);
        throw new Error('MIDI 파일을 찾을 수 없습니다.');
    }

    return new Promise((resolve, reject) => {
        exec(`"${musescorePath}" -o "${outputPath}" "${midiPath}"`, async (error, stdout, stderr) => {
            if (error) {
                console.error(`🎼 MIDI → PDF 변환 오류: ${stderr}`);
                return reject(new Error('MIDI to PDF 변환 실패'));
            }
            console.log(`✅ 변환 완료: ${outputPath}`);

            try {
                await fs.unlink(midiPath); // 업로드된 MIDI 파일 삭제
            } catch (err) {
                console.error(`🚨 MIDI 파일 삭제 오류: ${err.message}`);
            }

            resolve(outputPath);
        });
    });
}
