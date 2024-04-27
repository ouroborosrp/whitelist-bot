
# whitelist-bot

```
$$\      $$\ $$\       $$\   $$\               $$\ $$\             $$\     $$$$$$$\             $$\
$$ | $\  $$ |$$ |      \__|  $$ |              $$ |\__|            $$ |    $$  __$$\            $$ |
$$ |$$$\ $$ |$$$$$$$\  $$\ $$$$$$\    $$$$$$\  $$ |$$\  $$$$$$$\ $$$$$$\   $$ |  $$ | $$$$$$\ $$$$$$\
$$ $$ $$\$$ |$$  __$$\ $$ |\_$$  _|  $$  __$$\ $$ |$$ |$$  _____|\_$$  _|  $$$$$$$\ |$$  __$$\\_$$  _|
$$$$  _$$$$ |$$ |  $$ |$$ |  $$ |    $$$$$$$$ |$$ |$$ |\$$$$$$\    $$ |    $$  __$$\ $$ /  $$ | $$ |
$$$  / \$$$ |$$ |  $$ |$$ |  $$ |$$\ $$   ____|$$ |$$ | \____$$\   $$ |$$\ $$ |  $$ |$$ |  $$ | $$ |$$\
$$  /   \$$ |$$ |  $$ |$$ |  \$$$$  |\$$$$$$$\ $$ |$$ |$$$$$$$  |  \$$$$  |$$$$$$$  |\$$$$$$  | \$$$$  |
\__/     \__|\__|  \__|\__|   \____/  \_______|\__|\__|\_______/    \____/ \_______/  \______/   \____/
```

A Discord bot designed to manage IP whitelisting for FiveM servers. It simplifies the process of managing access to your server by automating whitelist management through Discord commands.

## Installation
To use WhitelistBot, you'll need to have Bun installed. If you haven't installed Bun yet, follow these steps:

1. Install Bun by running:

  ```bash
  npm install -g bun
  ```
2. Make sure Bun is properly installed by running:
  ```bash
  bun --version
  ```
Now that you have Bun installed, you can proceed to set up WhitelistBot.

## Environment Variables
WhitelistBot requires the following environment variables to be set:

| Variable Name       | Default Value   | Explanation                                                                   |
|---------------------|-----------------|--------------------------------------------------------------------------------|
| BOT_TOKEN           | N/A             | Discord bot token to authenticate with the Discord API.|
| APPLICATION_ID      | N/A             | Discord Application ID|
| DB_NAME             | db.sqlite    | Name of the SQLite database file used for storing whitelist information.       |
| ADMINS              | N/A             | Comma-separated list of Discord user IDs.               |
| WHITELISTED_ROLE_ID | N/A             | Discord ID of your whitelist role on discord|

Copy the `.env.example` file to `.env` and fill in the required values. Ensure you set these environment variables before running the bot.


## Usage


### Discord Commands

```
/whitelist <ip>
```
- **Description:** This is meant to be used by your players that are trying to get whitelisted.
- **Options:**
  - `ip`: Player IP address (IPv4).

### Blacklist Command

```
/blacklist <ip> <user>
```

- **Description:** This is for admins to blacklist a discord user and their IP address.
- **Options:**
  - `ip`: IP address (IPv4) to blacklist.
  - `user`: User to blacklist. 

### CLI Commands
To use WhitelistBot, run the following command in your terminal:

```bash
whitelist-bot <cmd> [args]
```

Replace `<cmd>` with one of the following commands:

- `run`: Starts the bot.

- `blacklist <IP>`: Blacklists the specified IP address.

- `whitelist <IP>`: Whitelists the specified IP address.

- `list`: Lists all IP addresses currently whitelisted.

For example, to start the bot, you would run:

```
whitelist-bot run
```

For additional command options and usage instructions, you can always refer to the help:

```
whitelist-bot --help
```

## Contributing
Contributions to WhitelistBot are welcome! If you encounter any bugs, have suggestions for improvements, or would like to add new features, feel free to open an issue or submit a pull request on GitHub.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.