import { ElementFinder, browser, by, element, WebElement, ElementArrayFinder, Key } from 'protractor';

export class DropdownMenuPage {
    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getSettingsBtn(): ElementFinder {
        return element(by.name('section-settings-btn'));
    }

    getDropdowMenu(): ElementFinder {
        return element(by.name('dropdown-menu'));
    }

    getRenameItem(): ElementFinder {
        return element(by.name('rename-item'));
    }

    getRemoveItem(): ElementFinder {
        return element(by.name('remove-item'));
    }

    getChangeColorItem(): ElementFinder {
        return element(by.name('color-item'));
    }

    getSortItem(): ElementFinder {
        return element(by.name('sort-item'));
    }

    getSortRadioBtns(): ElementArrayFinder {
        return element.all(by.name('date-sort'));
    }

    getSortLabel(): ElementArrayFinder {
        return element.all(by.name('date-sort-type'));
    }

    getFilterItem(): ElementFinder {
        return element(by.name('filter-item'));
    }

    getFilterCheckboxEven(): ElementFinder {
        return element(by.name('date-even'));
    }

    getFilterCheckboxUneven(): ElementFinder {
        return element(by.name('date-uneven'));
    }

    getFilterLabel(): ElementArrayFinder {
        return element.all(by.name('date-filter-type'));
    }

    public async isCheckedElement(elem: ElementFinder): Promise<boolean> {
        return elem.isSelected();
    }

    public async enterDataNotes(note: any): Promise<void> {
        await element(by.name('add-note-btn')).click();
        await element(by.name('title')).clear();
        await element(by.name('title')).sendKeys(note.title);
        await element(by.name('text')).clear();
        await element(by.name('text')).sendKeys(note.text);
        await element(by.name('note-date')).clear();
        await element(by.name('note-date')).sendKeys(note.date , Key.ARROW_RIGHT, note.time);
        await browser.sleep(3000);
        await element(by.name('add')).click();
    }

    getDates(): ElementArrayFinder {
        return element.all(by.name('note-date-text'));
    }

    public async checkSortMintoMax(): Promise<boolean> {
        let d1: string;
        let d2: string;
        await this.getDates().get(0).getText().then(val => d1 = val);
        await this.getDates().get(1).getText().then(val => d2 = val);
        if (+d1.substring(0, 2) > +d2.substring(0, 2)) {
            return false;
        }
        else {
            return true;
        }
    }

    public async checkFilter(numberOfNotes: number): Promise<string> {
        const dates = [];
        let result = 'even';
        let numberOfDates: number;
        await this.getDates().count().then(value => numberOfDates = value);
        for (let i = 0; i < numberOfDates; i++) {
            await this.getDates().get(i).getText().then(value => dates[i] = value);
        }
        if (numberOfNotes === numberOfDates) {
            return 'even-and-uneven';
        }
        for (let i = 0; i < numberOfDates; i++) {
            if (+dates[i].substring(0, 2) % 2 === 1) {
                result = 'uneven';
            }
            else {
                break;
            }
        }
        return result;
    }

}
