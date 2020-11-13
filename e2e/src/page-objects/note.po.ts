import { ElementFinder, browser, by, element, WebElement, ElementArrayFinder } from 'protractor';

export class AddNotePage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    /**
     * Возвращает кнопку добавления новой заметки.
     */
    getAddNoteBtn(): ElementFinder {
        return element(by.name('add-note-btn'));
    }

    /**
     * Возвращает компонент модального окна.
     */
    getModalNoteComponent(): ElementFinder {
        return element(by.tagName('app-modal-note'));
    }

    getCloseBtn(): ElementFinder {
        return element(by.name('close'));
    }

    getDescriptionTitle(): ElementFinder {
        return element(by.name('description-title'));
    }
    getDescriptionText(): ElementFinder {
        return element(by.name('description-text'));
    }
    getDescriptionDate(): ElementFinder {
        return element(by.name('description-date'));
    }

    getTitleField(): ElementFinder {
        return element(by.name('title'));
    }
    getTextField(): ElementFinder {
        return element(by.name('text'));
    }
    getDateField(): ElementFinder {
        return element(by.name('note-date'));
    }

    getSubmitBtn(): ElementFinder {
        return element(by.name('add'));
    }

    getNotes(): ElementArrayFinder {
        return element.all(by.tagName('app-note'));
    }

    public async checkNote(note): Promise<boolean> {
        let title;
        let text;
        await element(by.name('note-title')).getText().then(value => title = value);
        await element(by.name('note-text')).getText().then(value => text = value);
        if (note.title === title && note.text === text) {
            return true;
        }
        else {
            return false;
        }
    }

    public async enterDataNote(note): Promise<void> {
        await this.getTitleField().clear();
        await this.getTitleField().sendKeys(note.title);
        await this.getTextField().clear();
        await this.getTextField().sendKeys(note.text);
        await this.getDateField().clear();
        await this.getDateField().sendKeys(note.date);
    }

    public async getTitleFieldValue(): Promise<string> {
        return this.getTitleField().getAttribute('value');
    }

    public async getTextFieldValue(): Promise<string> {
        return this.getTextField().getAttribute('value');
    }

    public async getDateFieldValue(): Promise<string> {
        return this.getDateField().getAttribute('value');
    }

    public async isEnabledAddBtn(): Promise<boolean> {
        return this.getSubmitBtn().isEnabled();
    }

    public async getborderColorField(elem: ElementFinder): Promise<string> {
        return elem.getCssValue('border-color');
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
