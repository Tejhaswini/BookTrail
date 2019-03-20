class UsersItem
 {
  constructor(item,rating,madeIt,category,catalogCategory,readIt)
    {
    this._item = item;
    this._rating = rating;
    this._madeIt = madeIt;
    this._category = category;
    this._catalogCategory = catalogCategory;
    this._readIt = readIt;
    }
  get item()
    {
        return this._item;
    }
  set item(value)
    {
        this._item = item;
    }
  get rating()
      {
          return this._rating;
      }
  set rating(value)
      {
          this._rating = value;
      }
  get madeIt()
        {
            return this._madeIt;
        }
  set madeIt(value)
        {
            this._madeIt = value;
        }

  get category()
          {
              return this._category;
          }
  set category(value)
          {
              this._category = category;
          }
  get catalogCategory()
        {
            return this._catalogCategory;
        }
  set catalogCategory(value)
        {
            this._catalogCategory = catalogCategory;
        }

  get readIt()
          {
              return this._readIt;
          }
  set readIt(value)
          {
              this._readIt = readIt;
          }
};
module.exports = UsersItem;
