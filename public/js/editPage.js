function clearSelection() {
    Array.from(document.getElementsByClassName('delete-box')).forEach(function (item) {
        item.checked = false;
    })
}
function showConfirm() {
    if (checkedVerify()){
        document.getElementById('delete-confirm').removeAttribute('hidden', false)
        document.getElementById('submit-button').setAttribute('hidden', true)
    }
}
function hideConfirm() {
    document.getElementById('delete-confirm').setAttribute('hidden', true)
    document.getElementById('submit-button').removeAttribute('hidden', false)
}

function checkedVerify() {
    var count = 0;
    Array.from(document.getElementsByClassName('delete-box')).forEach(function (item) {

        if (item.checked) {
            count += 1;
        }
    })
    
    if (count>0) return true;
    else return false;
}