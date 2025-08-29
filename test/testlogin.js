import { Selector } from 'testcafe';

fixture`Login Tests`
    .page`http://localhost:5173`;

// Mock data
const mockData = [
    { username: 'admin1', password: '123456789' },
    { username: 'user007', password: 'userza123' }
];

// Selectors
const usernameInput = Selector('#username');
const passwordInput = Selector('#password');
const loginButton = Selector('#loginBtn');
const resultDiv = Selector('#result'); // สำหรับตรวจผลลัพธ์

// Test 1: Correct username and password
test('correct username and password', async t => {
    await t
        .typeText(usernameInput, mockData[0].username)
        .typeText(passwordInput, mockData[0].password)
        .click(loginButton)
        .expect(resultDiv.innerText).contains('login success'); // ตรวจข้อความสำเร็จ
});

// Test 2: Wrong username and correct password
test('wrong username and correct password', async t => {
    await t
        .typeText(usernameInput, 'wrongUser')
        .typeText(passwordInput, mockData[0].password)
        .click(loginButton)
        .expect(resultDiv.innerText).contains('user not found'); // ตรวจข้อความล้มเหลว
});

// Test 3: Correct username and wrong password
test('correct username and wrong password', async t => {
    await t
        .typeText(usernameInput, mockData[0].username)
        .typeText(passwordInput, 'wrongPass')
        .click(loginButton)
        .expect(resultDiv.innerText).contains('user not found'); // ตรวจข้อความล้มเหลว
});
