app.LoadPlugin( "UIExtras" );
app.LoadPlugin( "BusyBox" );

var angle= 0;

function OnStart()
{ 
 lay = app.CreateLayout( "Linear", "FillXY" );

 txt = app.CreateText( "Root Checker Plus", 1.0 );
 txt.SetTextSize( 28 );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetPadding( 0, 0.01, 0, 0.01 );
 txt.SetBackColor( "#1cbcff" );
 lay.AddChild( txt );
 lay.SetBackColor( "#FFFFFF" );
app.AddLayout( lay );




//Create a frame layout so we can put one image over another.
	layFrame = app.CreateLayout( "Frame", "" );	

	//Create first image.
	img = app.CreateImage( "/Sys/Img/Droid1.png", 0.4, -1 );
	layFrame.AddChild( img );
	
	//Create second image.
	img = app.CreateImage( "/Sys/Img/Hello.png", 0.4, -1 );
	img.Scale( 0.3, 0.3 );
	img.Move( 0, 0.15 );
	layFrame.AddChild( img );
	
	//Add layouts to app.	
	lay.AddChild( layFrame );
	
layM = app.CreateLayout( "Linear", "VCenter,FillXY" );
layM.SetMargins(0, 0.05, 0,0)
lay.AddChild( layM );
msg = "";
text = app.CreateText( msg, 1.0, -1, "MultiLine");
 text.SetTextSize( 20 );
 text.SetTextColor( "#111111" );
 layM.AddChild( text );
 layFam = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
 uix = app.CreateUIExtras();
 fam = uix.CreateFAMenu( "[fa-bars]", "Up,LabelsLeft" );
 fam.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fam.SetLabelBackColor( "#FFFFFF" );
 fam.SetLabelTextColor( "#646464" );
 fam.SetOnOpened( fam_OnOpened );
 fam.SetOnClosed( fam_OnClosed );
 layFam.AddChild( fam );
 
 fabCheck = uix.CreateFAButton( "[fa-play]", "Mini" );
 fabCheck.SetButtonColors( "#db4437", "#c33d32" );
 fabCheck.SetOnTouch( fab_OnCheck );
 fabCheck.SetLabel( "Check" );
 fam.AddFAButton( fabCheck );
 
 fabAbout = uix.CreateFAButton( "[fa-info]", "Mini" );
 fabAbout.SetButtonColors( "#db4437", "#c33d32" );
 fabAbout.SetOnTouch( fab_OnAbout );
 fabAbout.SetLabel( "About" );
 fam.AddFAButton( fabAbout );
 
 
 fabForward = uix.CreateFAButton( "[fa-share]", "Mini" );
 fabForward.SetButtonColors( "#fbbc05", "#efb306" );
 fabForward.SetOnTouch( fab_OnMailForward );
 fabForward.SetLabel( "Forward" );
 fam.AddFAButton( fabForward );
  app.AddLayout( layFam );
  
 devText = app.CreateText( "Developer: gauravssnl");
 devText.SetTextColor( "#FF0000" );
 devText.SetTextSize( 20 );
// layM.AddChild( devText );
 layDev = app.CreateLayout( "Linear", "Vertical, Bottom, FillXY" );
 //layDev.SetMargins( 0.01, 0.05, 0.01, 0.01 );
 layDev.AddChild( devText );
 layM.AddChild( layDev );

 app.ShowPopup( "Press the FAButton to add notes" );
 //Start timer to rotate top image.
setInterval( "RotateImage()", 10 );
}


function RotateImage( ev )
{
	img.Rotate( angle );
	angle += 3;
}


function fam_OnOpened()
{
 //layFam.SetBackColor( "#99FFFFFF" );
}

function fam_OnClosed()
{
// layFam.SetBackColor( "#00FFFFFF" );
}

function fab_OnCheck()
{
 app.ShowPopup( "Checking Root access");
 cmd1 = "su -c whoami";
 cmd2 = "which su";
 cmd3 = "ls -l ";
 
 res= app.SysExec(  cmd1 );
// alert(res);
 msg = "";
 if( res.match("root")) {
 msg = "Your phone is rooted";
 res1 = app.SysExec( cmd2);
// alert(res1);
 res2 = app.SysExec( cmd3 + res1 ); 
 //alert(res2);
 msg += "\n" + "su attribute :\n " + res2;
 }
 else if(res.match(/Permission denied/))  {
 msg = "Root Access Denied."
 msg  += "\n" + "Please grant Superuser Access. \nYour phone might be rooted.";
 //alert(msg);
 }
 else {
 msg = "Your phone is not rooted.";
 }
 
 text.SetText( msg );
 

}

function fab_OnAbout()
{
 app.ShowPopup( "Developed by gauravssnl" );
}

function fab_OnMailForward()
{
 app.ShowPopup( "Share" );
}