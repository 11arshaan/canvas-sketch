To use canvas-sketch cli, first install it globally:
```npm install canvas-sketch-cli --location=global```

then run this command:

```canvas-sketch sketch.js --new --open```

sketch.js: replace with name of file
--new: creates new file if it doesn't already exist
--open: will open the file



Press ctrl+s to save an image to the output folder
Press ctlr+shift+s to start and stop the saving of animation frames to the output folder

Output folder is "downloads" by default. Specify in cli with:

--output=output/01
This creates a folder called 01 in the output directory, saving all frames there.
Use a new folder for every sketch.



