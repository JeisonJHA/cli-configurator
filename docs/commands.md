# Command Reference for cli-configurator

## Need a system variable: CONFIG_HOME

### It is used to define where are the configurations

* On this folder it is needed a file named config.json containing the following format:
```json
{
    "bases": [
        "name1",
        "name2"
    ]
}
```

* On this path it is needed a folder containing the following files:

```json
#project-config.json
{
    "path": "path/to/the/appsettings.json"
}
```
- name1.json containing the config to the db you want, the name of the file has to be the same as the config above.

### set:appsettings

# TODO: 
* get db names from files on projects

