import { action, observable } from 'mobx';

class Counter {

  @observable counter = 0;

  @action increaseCounter = () => {
    this.counter += 1;
  };

  @action decreaseCounter = () => {
    (this.counter > 0) && (this.counter -= 1);
  };

}
export default Counter;