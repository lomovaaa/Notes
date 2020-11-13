import { AddSectionPage } from './page-objects/section.po';
import { browser, logging } from 'protractor';
import { title } from 'process';
import data from './test-data.json';

describe('Добавление секции:', () => {
  const page: AddSectionPage = new AddSectionPage();

  beforeAll(async () => {
    await page.navigateTo();
  });

  it('Наличие кнопки добавления новой секции', () => {
    expect(page.getAddSectionBtn()?.isPresent()).toBeTruthy(
      'Отсутствует кнопка добавления новой секции'
    );
  });

  it('Открытие модального окна для добавления секции', async () => {
    await page.getAddSectionBtn().click();
    expect(page.getModalSectionComponent()?.isPresent()).toBeTruthy(
      'Компонент модального окна отсутствует'
    );
  });

  it('В модальном окне отображаются все необходимые элементы', () => {
    expect(page.getCloseBtn()?.isPresent()).toBeTruthy('Кнопка закрытия модального окна не отображается');
    expect(page.getDescriptionTitle()?.isPresent()).toBeTruthy('Подпись к полю ввода заголовка не отображается');
    expect(page.getTitleField()?.isPresent()).toBeTruthy('Поле ввода заголовка не отображается');
    expect(page.getSubmitBtn()?.isPresent()).toBeTruthy('Кнопка добавления секции не отображается');
  });

  it('Добавление секции без заголовка', async () => {
    await page.getSubmitBtn().click();
    expect(await page.getTitleFieldValue()).toBe('', 'Значение поля ввода непустое');
    expect(page.getModalSectionComponent()?.isPresent()).toBeTruthy('Компонент модального окна отсутствует');
    expect(await page.isEnabledAddBtn()).toBe(false, 'Кнопка добавления в состоянии по умолчанию');
    expect(page.getSections().count()).toBe(0, 'Добавлена секция без заголовка');
  });

  it('Валидация формы с пустым полем ввода', async () => {
    await page.getTitleField().click();
    expect(await page.isCursorOnElement(page.getTitleField())).toBe(true, 'Поле ввода не в фокусе');
    expect(await page.getBorderColorField()).toBe('rgb(236, 76, 76)', 'Поле ввода валидно, подсвечивается зелёным');
    expect(await page.isEnabledAddBtn()).toBe(false, 'Кнопка добавления в состоянии по умолчанию');
  });

  it('Валидация формы с заполненным полем ввода.', async () => {
    await page.getTitleField().click();
    await page.enterSectionTitle(data.t1);
    expect(await page.isCursorOnElement(page.getTitleField())).toBe(true, 'Поле ввода не в фокусе');
    expect(await page.getBorderColorField()).toBe('rgb(23, 145, 23)', 'Поле ввода невалидно, подсвечивается красным');
    expect(await page.isEnabledAddBtn()).toBe(true, 'Кнопка добавления в состоянии disabled');
  });

  it('Добавление секции с заголовком', async () => {
    await page.enterSectionTitle(data.t1);
    expect(await page.getTitleFieldValue()).toBe(data.t1.title, 'Введенное значение не соответствует ожидаемому');
    await page.getSubmitBtn().click();
    expect(page.getModalSectionComponent()?.isPresent()).toBeFalsy('Наличие компонента модального окна');
    expect(page.getSections().count()).toBe(1, 'Секция не добавлена');
    expect(page.getSections().get(0).getText()).toBe(data.t1.title, 'Заголовок добавленной секции не соответствует ожидаемому');
  });

  it('Закрытие модального окна', async () => {
    await page.getAddSectionBtn().click();
    await page.getCloseBtn().click();
    expect(page.getModalSectionComponent()?.isPresent()).toBeFalsy(
      'Модальное окно не закрылось'
    );
  });
});
