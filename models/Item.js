class Item {

constructor(itemCode,itemName,catalogCategory,description,rating,imageURL)
{
this._itemCode = itemCode;
this._itemName = itemName;
this._catalogCategory = catalogCategory;
this._description = description;
this._rating = rating;
this._imgURL = imageURL;
};

  get itemCode() {
      return this._itemCode;
  }

  set itemCode(value) {
      this._itemCode = value;
  }

  get itemName() {
      return this._itemName;
  }

  set itemName(value) {
      this._itemName = value;
  }

  get catalogCategory() {
      return this._catalogCategory;
  }

  set catalogCategory(value) {
      this._catalogCategory = value;
  }

  get description() {
      return this._description;
  }

  set description(value) {
      this._description = value;
  }

  get rating() {
      return this._rating;
  }

  set rating(value) {
      this._rating = value;

  }
  get imageURL() {
      return this._imgURL;
  }

  set imageURL(value) {
      this._imgURL = value;
  }
}
module.exports = Item;