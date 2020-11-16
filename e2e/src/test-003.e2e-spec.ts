import { DropdownMenuPage } from './page-objects/dropdown-menu.po';
import { browser, element, logging, by } from 'protractor';
import { title } from 'process';
import data from './test-data.json';

describe('Сортировка и фильтрация заметок:', () => {
    const page: DropdownMenuPage = new DropdownMenuPage();

    beforeAll(async () => {
        await page.navigateTo();
        await page.enterDataNotes(data.notes[1]);
        await browser.sleep(6000);
    });

    it('Наличие кнопки открытия настроек секции', () => {
        expect(page.getSettingsBtn()?.isPresent()).toBeTruthy('Кнопка открытия настроек секции отсутствует');
    });

    it('Открытие выпадающего меню', async () => {
        await browser.actions().mouseMove(page.getSettingsBtn()).perform();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню не открылось');
    });

    it('В выпадающем меню отображаются все необходимые элементы', async () => {
        expect(page.getRenameItem()?.isPresent()).toBeTruthy('Элемент переименования секции не отображается');
        expect(page.getRemoveItem()?.isPresent()).toBeTruthy('Элемент удаления секции не отображается');
        expect(page.getChangeColorItem()?.isPresent()).toBeTruthy('Элемент изменения цвета секции не отображается');

        expect(page.getSortItem()?.isPresent()).toBeTruthy('Элемент сортировки не отображается');
        expect(page.getSortRadioBtns()?.isPresent()).toBeTruthy('Радио-кнопки для сортировки не отображаются');
        expect(await page.getSortRadioBtns().count()).toBe(2, 'Недостаточное количество радио-кнопок для сортировки');

        expect(page.getFilterItem()?.isPresent()).toBeTruthy('Элемент фильтрации не отображается');
        expect(page.getFilterCheckboxEven()?.isPresent()).toBeTruthy('Чекбокс для фильтрации по четным дням не отображается');
        expect(page.getFilterCheckboxUneven()?.isPresent()).toBeTruthy('Чекбокс для фильтрации по нечетным дням не отображается');
    });

    it('Сортировка заметок по возрастанию даты и времени', async () => {
        await page.getSortLabel().get(0).click();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню закрылось');
        expect(await page.isCheckedElement(page.getSortRadioBtns().get(0))).toBe(true, 'Выбрана сортировка по убыванию');
        expect(await page.isCheckedElement(page.getSortRadioBtns().get(1))).toBe(false);
        expect(await page.checkSortMintoMax()).toBe(true, 'Заметки отсортированы по убыванию');
    });

    it('Сортировка заметок по убыванию даты и времени', async () => {
        await page.getSortLabel().get(1).click();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню закрылось');
        expect(await page.isCheckedElement(page.getSortRadioBtns().get(1))).toBe(true, 'Выбрана сортировка по возрастанию');
        expect(await page.isCheckedElement(page.getSortRadioBtns().get(0))).toBe(false);
        expect(await page.checkSortMintoMax()).toBe(false, 'Заметки отсортированы по возрастанию');
    });

    it('Фильтрация только по четным датам', async () => {
        await page.getFilterLabel().get(0).click();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню закрылось');
        expect(await page.isCheckedElement(page.getFilterCheckboxEven())).toBe(true, 'Выбрана фильтрация по нечетным датам');
        expect(await page.isCheckedElement(page.getFilterCheckboxUneven())).toBe(false);
        expect(await page.checkFilter(data.notes.length)).toBe('even', 'Выбран другой способ фильтрации');
    });

    it('Фильтрация только по нечетным датам', async () => {
        await page.getFilterLabel().get(0).click();
        await page.getFilterLabel().get(1).click();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню закрылось');
        expect(await page.isCheckedElement(page.getFilterCheckboxEven())).toBe(false, 'Выбрана фильтрация по четным датам');
        expect(await page.isCheckedElement(page.getFilterCheckboxUneven())).toBe(true);
        expect(await page.checkFilter(data.notes.length)).toBe('uneven', 'Выбран другой способ фильтрации');
    });

    it('Фильтрация по четным и нечетным датам', async () => {
        await page.getFilterLabel().get(0).click();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню закрылось');
        expect(await page.isCheckedElement(page.getFilterCheckboxEven())).toBe(true, 'Выбрана фильтрация по нечетным датам');
        expect(await page.isCheckedElement(page.getFilterCheckboxUneven())).toBe(true);
        expect(await page.checkFilter(data.notes.length)).toBe('even-and-uneven', 'Выбран другой способ фильтрации');
    });

    it('Отмена фильтрации', async () => {
        await page.getFilterLabel().get(0).click();
        await page.getFilterLabel().get(1).click();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню закрылось');
        expect(await page.isCheckedElement(page.getFilterCheckboxEven())).toBe(false, 'Выбрана фильтрация по нечетным датам');
        expect(await page.isCheckedElement(page.getFilterCheckboxUneven())).toBe(false);
        expect(await page.checkFilter(data.notes.length)).toBe('even-and-uneven', 'Выбран один из способов фильтрации');
    });


    it('Закрытие выпадающего меню', async () => {
        await browser.actions().mouseMove(element(by.name('add-section-btn'))).perform();
        expect(page.getDropdowMenu().isDisplayed()).toBeFalsy('Выпадающее меню не закрылось');

        await browser.actions().mouseMove(page.getSettingsBtn()).perform();
        await browser.actions().mouseMove(page.getDropdowMenu()).perform();
        expect(page.getDropdowMenu().isDisplayed()).toBeTruthy('Выпадающее меню не отобразилось');
        await browser.actions().mouseMove(element(by.name('add-section-btn'))).perform();
        expect(page.getDropdowMenu().isDisplayed()).toBeFalsy('Выпадающее меню не закрылось');
    });
});
