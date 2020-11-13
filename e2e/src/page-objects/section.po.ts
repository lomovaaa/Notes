import { ElementFinder, browser, by, element, ElementArrayFinder, WebElement } from 'protractor';

export class AddSectionPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  /**
   * Возвращает кнопку добавления новой секции.
   */
  getAddSectionBtn(): ElementFinder {
    return element(by.name('add-section-btn'));
  }

  /**
   * Возвращает компонент модального окна.
   */
  getModalSectionComponent(): ElementFinder {
    return element(by.tagName('app-modal-section'));
  }

  getCloseBtn(): ElementFinder {
    return element(by.name('close'));
  }

  getDescriptionTitle(): ElementFinder {
    return element(by.name('description-title'));
  }

  getTitleField(): ElementFinder {
    return element(by.name('title'));
  }

  /**
   * Возвращает кнопку отправки формы.
   */
  getSubmitBtn(): ElementFinder {
    return element(by.name('add'));
  }

  /**
   * Возвращает массив компонентов секций.
   */
  getSections(): ElementArrayFinder {
    return element.all(by.tagName('app-section'));
  }

  /**
   * Вводит название секции в форму добавления секции.
   * @param section объект данных для секции
   */
  public async enterSectionTitle(section): Promise<void> {
    await this.getTitleField().clear();
    await this.getTitleField().sendKeys(section.title);
  }

  public async getTitleFieldValue(): Promise<string> {
    return this.getTitleField().getAttribute('value');
  }

  public async isEnabledAddBtn(): Promise<boolean> {
    return this.getSubmitBtn().isEnabled();
  }

  public async getBorderColorField(): Promise<string> {
    return this.getTitleField().getCssValue('border-color');
  }

  /**
   * Определяет, находится ли элемент в фокусе.
   * @param elem проверяемый элемент
   */
  public async isCursorOnElement(elem: ElementFinder): Promise<boolean> {
    const el: WebElement = await elem?.getWebElement();
    const focusElement: WebElement = await browser.driver.switchTo().activeElement();
    return (
      (await el.getLocation()).x === (await focusElement.getLocation()).x &&
      (await el.getLocation()).y === (await focusElement.getLocation()).y
    );
  }
}
