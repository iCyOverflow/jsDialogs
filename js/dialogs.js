// Enables or disables debugging messages.
var debugMode = false;


// FUNCTION showDialog(headerText, contentText [, icon [, buttons]])
// shows a dialog box with the given parameters.
// headerText   String          The main text of the dialog box
// contentText  String          The sub-text, or explaination text
// icon         int (optional)  the icon to be shown: 0-Stop, 1-Caution, 2-Alert/Note
//                              default: 2-Alert/Note
// buttons      json (optional) JSON array holding the descripion of the buttons, and their action function
//                              for each button:
//                              label   String    Button label text
//                              action  function  (optional) the function to be called when the button is clicked
//                                                default: hideDialog
//                              default boolean   (optional) whether this button is to be styled as default or not
//                                                default: false
function showDialog(headerText, contentText, icon, buttons){
  // Check for headerText and contentText
  if(typeof headerText != 'string'){
    dLog('headerText is required and should be of type String.');
    return false;
  }
  if(typeof contentText != 'string'){
    dLog('contentText is required and should be of type String.');
    return false;
  }

  buttons = (typeof buttons != 'undefined') ? buttons : [{'label':'OK', 'action': hideDialog, 'default': true}];
  icon = (typeof icon != 'undefined') ? icon : 2  // 0-Stop, 1-Caution, 2-Alert/Note

  // Expecting #modalDialogShade and #modalDialog to be on the page, styled as needed.
  var dialogBox = document.getElementById('modalDialog');
  var dialogShader = document.getElementById('modalDialogShade');
  var dialogIcon = document.getElementById('dialogIcon');
  var dialogHeader = document.getElementById('dialogHeader');
  var dialogContent = document.getElementById('dialogContent');
  var dialogButtonsArea = document.getElementById('dialogButtonsArea');


  if(!dialogBox || !dialogShader || !dialogIcon || !dialogHeader || !dialogContent || !dialogButtonsArea){
    dLog('Some dialog elements could not be found. Are you sure you constructed your dialog box correctly in html?');
    return false;
  }

  // ** Build the dialogbox **
  switch(icon){
    case 0:
      dialogIcon.src = 'images/dlg_icn_stop.png';
      break;
    case 1:
      dialogIcon.src = 'images/dlg_icn_caution.png';
      break;
    case 2:
      dialogIcon.src = 'images/dlg_icn_alert.png';
      break;
  }
  dialogHeader.innerText = headerText;
  dialogContent.innerText = contentText;
  dialogButtonsArea.innerHTML = '';

  for(let i = 0; i < buttons.length; i++){
    button = document.createElement('A');
    button.classList.add('dialogButton');
    button.innerText = buttons[i].label;
    if(buttons[i].default) button.classList.add('defaultButton');
    button.onclick = function(){
      if(!buttons[i].action){
        dLog('Button has no action, defaulting to hiding the dialog.');
        hideDialog();
      }else{
        dLog('Button action is ' + buttons[i].action);
        buttons[i].action();
        hideDialog(); //hiding the dialog after the button is pressed, anyway
      }
    };
    dialogButtonsArea.appendChild(button);
  }

  dialogShader.style.display = 'flex';
  return true;
}

function hideDialog(){
  document.getElementById('modalDialogShade').style.display = 'none';
}

function dLog(msg){
  if(debugMode) console.log('[showDialog] ' + msg);
}

function deleteItem(){
  dLog('Item deleted!');
}