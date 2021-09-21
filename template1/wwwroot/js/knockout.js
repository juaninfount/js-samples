function CounterViewModel(){

    let self = this;
    self.firstname = ko.observable("wayne");


}


ko.applyBindings(new CounterViewModel(), 
document.querySelector("#knockout-app"))