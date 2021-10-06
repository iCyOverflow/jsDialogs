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
  // Default values if not provided.
  buttons = (typeof buttons != 'undefined') ? buttons : [{'label':'OK', 'action': hideDialog, 'default': true}];
  icon = (typeof icon != 'undefined') ? icon : 2  // 0-Stop, 1-Caution, 2-Alert/Note

  // check for #dialogShader and clear it
  var dialogShader = document.getElementById('modalDialogShade');
  if(!dialogShader){
    dLog('Could not find the #dialogShader DIV. Your HTML should have a DIV with ID dialogShader for this to work.');
    return false;
  }
  dialogShader.innerHTML = '';

  // Construct html dialog tags inside the #modalDialogShade
  var dialogBox = document.createElement('DIV');
  dialogBox.id = 'modalDialog';
  dialogShader.appendChild(dialogBox);

  var dialogIcon = document.createElement('IMG');
  dialogIcon.id = 'dialogIcon';
  dialogBox.appendChild(dialogIcon);

  var dialogHeader = document.createElement('H2');
  dialogHeader.id = 'dialogHeader';
  dialogBox.appendChild(dialogHeader);

  var dialogContent = document.createElement('P');
  dialogContent.id = 'dialogContent';
  dialogBox.appendChild(dialogContent);

  var dialogButtonsArea = document.createElement('DIV');
  dialogButtonsArea.id = 'dialogButtonsArea';
  dialogBox.appendChild(dialogButtonsArea);




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