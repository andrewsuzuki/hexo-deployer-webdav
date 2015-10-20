hexo.extend.deployer.register('webdav', function(args, callback){
  if (!args.remote){
    var help = [
      'You should argsure deployment settings in _config.yml first!',
      '',
      'Example:',
      '  deploy:',
      '    type: webdav',
      '    remote: <remote>',
      '    user: [user]',
      '    pass: [pass]',
      '    curl: [curl] # Default is `curl --insecure -s -S`',
      '    ignore: [ignore] # Default is `.hg,.git,.svn,.DS_Store`',
      '    verbose: [verbose] # Default is false',
      '',
      'WebDAV sync by Andrew Suzuki'
    ];

    console.log(help.join('\n'));
    return callback();
  }

  // Build options

  options = {
    local_base: hexo.public_dir,
    remote_base: args.remote,
    curl: args.curl || 'curl --insecure -s -S',
    ignored: args.ignore || '.hg,.git,.svn,.DS_Store',
    verbose: args.verbose || false
  };

  if (args.user) {
    options.username = args.user;
  }

  if (args.pass) {
    options.password = args.pass;
  }

  var sync = (require('webdav-sync'))(options);
  sync.start();

});
