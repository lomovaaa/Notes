import { AddNotePage } from './page-objects/note.po';
import { browser, logging } from 'protractor';
import { title } from 'process';
import data from './test-data.json';

describe('Добавление заметки:', () => {
    const page: AddNotePage = new AddNotePage();

    beforeAll(async () => {
        await page.navigateTo();
    });

    it('Наличие кнопки добавления новой заметки', () => {
        expect(page.getAddNoteBtn()?.isPresent()).toBeTruthy(
            'Отсутствует кнопка добавления новой секции'
        );
    });

    it('Открытие модального окна для добавления заметки', async () => {
        await page.getAddNoteBtn().click();
        expect(page.getModalNoteComponent()?.isPresent()).toBeTruthy(
            'Компонент модального окна отсутствует'
        );
    });

    it('В модальном окне отображаются все необходимые элементы', async () => {
        expect(page.getCloseBtn()?.isPresent()).toBeTruthy('Кнопка закрытия модального окна не отображается');
        expect(page.getDescriptionTitle()?.isPresent()).toBeTruthy('Подпись к полю ввода заголовка не отображается');
        expect(page.getTitleField()?.isPresent()).toBeTruthy('Поле ввода заголовка не отображается');
        expect(page.getDescriptionText()?.isPresent()).toBeTruthy('Подпись к полю ввода текста не отображается');
        expect(page.getTextField()?.isPresent()).toBeTruthy('Поле ввода текста не отображается');
        expect(page.getDescriptionDate()?.isPresent()).toBeTruthy('Подпись к полю ввода даты не отображается');
        expect(page.getDateField()?.isPresent()).toBeTruthy('Поле ввода даты не отображается');
        expect(await page.getDateFieldValue()).not.toBe('', 'Значение поля ввода даты пустое');
        expect(page.getSubmitBtn()?.isPresent()).toBeTruthy('Кнопка добавления заметки не отображается');
    });

    it('Валидация формы с пустыми полями ввода.', async () => {
        await page.getTitleField().click();
        expect(await page.isCursorOnElement(page.getTitleField())).toBe(true, 'Поле ввода заголовка не в фокусе');
        expect(await page.getborderColorField(page.getTitleField())).toBe('rgb(236, 76, 76)', 'Поле ввода заголовка валидно, подсвечивается зелёным');

        await page.getTextField().click();
        expect(await page.isCursorOnElement(page.getTextField())).toBe(true, 'Поле ввода текста не в фокусе');
        expect(await page.getborderColorField(page.getTextField())).toBe('rgb(236, 76, 76)', 'Поле ввода текста валидно, подсвечивается зелёным');

        // await page.getDateField().clear();
        // await page.getDateField().sendKeys('');
        // await page.getDateField().click();
        // expect(await page.isCursorOnElement(page.getDateField())).toBe(true, 'Поле ввода даты не в фокусе');
        // expect(await page.getborderColorField(page.getDateField())).toBe('rgb(236, 76, 76)', 'Поле ввода даты валидно, подсвечивается зелёным');

        expect(await page.isEnabledAddBtn()).toBe(false, 'Кнопка добавления в состоянии по умолчанию');
    });

    it('Добавление заметки с неполными данными', async () => {
        await page.enterDataNote(data.n1);
        expect(await page.getTitleFieldValue()).toBe(data.n1.title, 'Введенное значение не соответствует ожидаемому');
        expect(await page.getTextFieldValue()).toBe(data.n1.text, 'Введенное значение не соответствует ожидаемому');
        await page.getSubmitBtn().click();
        expect(page.getModalNoteComponent()?.isPresent()).toBeTruthy('Компонент модального окна отсутствует');
        expect(await page.isEnabledAddBtn()).toBe(false, 'Кнопка добавления в состоянии по умолчанию');
        expect( await page.getNotes().count()).toBe(0, 'Добавлена заметка с неполными данными');
    });

    it('Валидация формы с заполненными полями ввода.', async () => {
        await page.enterDataNote(data.notes[0]);

        await page.getTitleField().click();
        expect(await page.isCursorOnElement(page.getTitleField())).toBe(true, 'Поле ввода заголовка не в фокусе');
        expect(await page.getborderColorField(page.getTitleField())).toBe('rgb(23, 145, 23)', 'Поле ввода заголовка не валидно, подсвечивается красным');

        await page.getTextField().click();
        expect(await page.isCursorOnElement(page.getTextField())).toBe(true, 'Поле ввода текста не в фокусе');
        expect(await page.getborderColorField(page.getTextField())).toBe('rgb(23, 145, 23)', 'Поле ввода текста не валидно, подсвечивается красным');

        await page.getDateField().click();
        expect(await page.isCursorOnElement(page.getDateField())).toBe(true, 'Поле ввода даты не в фокусе');
        expect(await page.getborderColorField(page.getDateField())).toBe('rgb(23, 145, 23)', 'Поле ввода даты не валидно, подсвечивается красным');

        expect(await page.isEnabledAddBtn()).toBe(true, 'Кнопка добавления в состоянии disabled');
    });

    it('Добавление заметки с полными данными', async () => {
        await page.enterDataNote(data.notes[0]);
        expect(await page.getTitleFieldValue()).toBe(data.notes[0].title, 'Введенное значение не соответствует ожидаемому');
        expect(await page.getTextFieldValue()).toBe(data.notes[0].text, 'Введенное значение не соответствует ожидаемому');
        await page.getSubmitBtn().click();
        expect(page.getModalNoteComponent()?.isPresent()).toBeFalsy('Наличие компонента модального окна');
        expect(page.getNotes().count()).toBe(1, 'Заметка не добавлена');
        expect(await page.checkNote(data.notes[0])).toBe(true, 'Отсутствует заметка с введенными данными');
    });

    it('Закрытие модального окна', async () => {
        await page.getAddNoteBtn().click();
        await page.getCloseBtn().click();
        expect(page.getModalNoteComponent()?.isPresent()).toBeFalsy(
            'Модальное окно не закрылось'
        );
    });
});
