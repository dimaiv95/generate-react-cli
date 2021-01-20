# Generate React CLI

This tool provides fast creating React components and gets rid of copying, pasting and renaming files.

## Installation

```
  npm install generate-cli-react --save-dev
```

## Usage

This command create a folder with your component within default directory.

```
  npx generate-react component Box
```

You can also generate a few components at once.

```
  npx generate-react component Box Card Button
```

### Example of the component files structure by default:

```
|-- /src
    |-- /components
        |-- /Box
            |-- Box.js
            |-- index.js
```

### Options

You can also overwrite default options.

```
  npx generate-react component Box --withStyle --usePreprocessor scss
```

### Example of the component files structure with options above:

```
|-- /src
    |-- /components
        |-- /Box
            |-- Box.js
            |-- Box.scss
            |-- index.js
```

<table>
  <tr align="left">
    <th>Options</th>
    <th>Description</th>
    <th>Value Type</th>
    <th>Default Value</th>
  </tr>
  <tr align="left">
    <td width="10%">--path</td>
    <td width="50%">The path where you want the component to be generated.</td>
    <td width="20%">String</td>
    <td width="20%">./src/components</td>
  </tr>
  <tr align="left">
    <td width="10%">--withStyle</td>
    <td width="50%">Creates a stylesheet file with this component.</td>
    <td width="20%">Boolean</td>
    <td width="20%">false</td>
  </tr>
  <tr align="left">
    <td width="10%">--usePreprocessor</td>
    <td width="50%">Creates a stylesheet file used a preprocessor such as scss with this component.</td>
    <td width="20%">String</td>
    <td width="20%">""</td>
  </tr>
  <tr align="left">
    <td width="10%">--useTypescript</td>
    <td width="50%">Creates the typescript component.</td>
    <td width="20%">Boolean</td>
    <td width="20%">false</td>
  </tr>
<table>
