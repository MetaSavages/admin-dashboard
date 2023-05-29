const dataTableUsersData = {
  columns: [
    { Header: 'First Name', accessor: 'first_name' },
    { Header: 'Last Name', accessor: 'last_name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' }
  ],
  rows: [
    { id: 1, first_name: 'Benedick', last_name: 'Bogeys', email: 'bbogeys0@webs.com', role: 'Construction Manager' },
    { id: 2, first_name: 'Avis', last_name: 'Jozsef', email: 'ajozsef1@techcrunch.com', role: 'Subcontractor' },
    {
      id: 3,
      first_name: 'Petra',
      last_name: 'Clemenza',
      email: 'pclemenza2@blogspot.com',
      role: 'Construction Expeditor'
    },
    { id: 4, first_name: 'Galven', last_name: 'Cartwight', email: 'gcartwight3@gmpg.org', role: 'Surveyor' },
    {
      id: 5,
      first_name: 'Anastasie',
      last_name: 'Lippi',
      email: 'alippi4@macromedia.com',
      role: 'Construction Worker'
    },
    { id: 6, first_name: 'Karney', last_name: 'Maberley', email: 'kmaberley5@unicef.org', role: 'Project Manager' },
    { id: 7, first_name: 'Jonie', last_name: 'Allen', email: 'jallen6@wiley.com', role: 'Architect' },
    { id: 8, first_name: 'Marji', last_name: 'Vlach', email: 'mvlach7@miibeian.gov.cn', role: 'Supervisor' },
    { id: 9, first_name: 'Gertie', last_name: 'Baldini', email: 'gbaldini8@mashable.com', role: 'Architect' },
    { id: 10, first_name: 'Meredith', last_name: 'Soots', email: 'msoots9@nytimes.com', role: 'Project Manager' },
    { id: 11, first_name: 'Lemmy', last_name: 'Tubridy', email: 'ltubridya@utexas.edu', role: 'Project Manager' },
    { id: 12, first_name: 'Marielle', last_name: 'Mabb', email: 'mmabbb@technorati.com', role: 'Project Manager' },
    { id: 13, first_name: 'Tobias', last_name: 'Turl', email: 'tturlc@wsj.com', role: 'Surveyor' },
    { id: 14, first_name: 'Merrilee', last_name: 'Deerness', email: 'mdeernessd@dropbox.com', role: 'Engineer' },
    { id: 15, first_name: 'Ivy', last_name: 'Wogan', email: 'iwogane@dyndns.org', role: 'Surveyor' },
    { id: 16, first_name: 'Ingamar', last_name: 'Rosenfarb', email: 'irosenfarbf@mtv.com', role: 'Subcontractor' },
    { id: 17, first_name: 'Catriona', last_name: 'Gowry', email: 'cgowryg@rambler.ru', role: 'Estimator' },
    { id: 18, first_name: 'Kasper', last_name: 'Bolland', email: 'kbollandh@gnu.org', role: 'Surveyor' },
    { id: 19, first_name: 'Lianna', last_name: 'Haveline', email: 'lhavelinei@netscape.com', role: 'Surveyor' },
    {
      id: 20,
      first_name: 'Iosep',
      last_name: 'Yegorovnin',
      email: 'iyegorovninj@liveinternet.ru',
      role: 'Construction Worker'
    },
    { id: 21, first_name: 'Rudolf', last_name: 'Cotelard', email: 'rcotelardk@amazon.com', role: 'Surveyor' },
    {
      id: 22,
      first_name: 'Benson',
      last_name: 'Anning',
      email: 'banningl@answers.com',
      role: 'Construction Expeditor'
    },
    { id: 23, first_name: 'Meriel', last_name: 'Lardner', email: 'mlardnerm@soup.io', role: 'Subcontractor' },
    { id: 24, first_name: 'Rycca', last_name: 'Clother', email: 'rclothern@tiny.cc', role: 'Subcontractor' },
    { id: 25, first_name: 'Felipa', last_name: 'Scalera', email: 'fscalerao@weibo.com', role: 'Supervisor' },
    { id: 26, first_name: 'Dom', last_name: 'Rue', email: 'druep@columbia.edu', role: 'Electrician' },
    { id: 27, first_name: 'Henrieta', last_name: 'Hartridge', email: 'hhartridgeq@mozilla.org', role: 'Supervisor' },
    { id: 28, first_name: 'Ari', last_name: 'Flawn', email: 'aflawnr@phpbb.com', role: 'Construction Worker' },
    { id: 29, first_name: 'Suzette', last_name: 'Grimm', email: 'sgrimms@un.org', role: 'Architect' },
    { id: 30, first_name: 'Demetrius', last_name: 'Butterfint', email: 'dbutterfintt@cdbaby.com', role: 'Engineer' },
    {
      id: 31,
      first_name: 'Bentley',
      last_name: 'Cornall',
      email: 'bcornallu@stanford.edu',
      role: 'Construction Worker'
    },
    {
      id: 32,
      first_name: 'Dorrie',
      last_name: 'Biggadike',
      email: 'dbiggadikev@instagram.com',
      role: 'Construction Worker'
    },
    { id: 33, first_name: 'Torey', last_name: 'Dymocke', email: 'tdymockew@stanford.edu', role: 'Supervisor' },
    { id: 34, first_name: 'Reece', last_name: 'Stormes', email: 'rstormesx@about.me', role: 'Construction Foreman' },
    { id: 35, first_name: 'Nell', last_name: 'Marvel', email: 'nmarvely@qq.com', role: 'Construction Foreman' },
    { id: 36, first_name: 'Fayth', last_name: 'Bower', email: 'fbowerz@skyrock.com', role: 'Project Manager' },
    {
      id: 37,
      first_name: 'Danit',
      last_name: 'MacKenny',
      email: 'dmackenny10@creativecommons.org',
      role: 'Subcontractor'
    },
    {
      id: 38,
      first_name: 'Jacenta',
      last_name: 'Davall',
      email: 'jdavall11@nationalgeographic.com',
      role: 'Architect'
    },
    { id: 39, first_name: 'Rina', last_name: 'Donisi', email: 'rdonisi12@godaddy.com', role: 'Surveyor' },
    { id: 40, first_name: 'Sharia', last_name: 'Helbeck', email: 'shelbeck13@baidu.com', role: 'Electrician' },
    { id: 41, first_name: 'Elwin', last_name: 'Lorie', email: 'elorie14@smugmug.com', role: 'Construction Foreman' },
    {
      id: 42,
      first_name: 'Brittani',
      last_name: 'Curtiss',
      email: 'bcurtiss15@census.gov',
      role: 'Construction Expeditor'
    },
    {
      id: 43,
      first_name: 'Laetitia',
      last_name: 'Battie',
      email: 'lbattie16@businessweek.com',
      role: 'Construction Foreman'
    },
    {
      id: 44,
      first_name: 'Elsworth',
      last_name: 'Danzelman',
      email: 'edanzelman17@cloudflare.com',
      role: 'Construction Expeditor'
    },
    { id: 45, first_name: 'Delcina', last_name: 'Pulham', email: 'dpulham18@bloglines.com', role: 'Electrician' },
    { id: 46, first_name: 'Reggis', last_name: 'Jevons', email: 'rjevons19@is.gd', role: 'Supervisor' },
    {
      id: 47,
      first_name: 'Farly',
      last_name: 'De Meyer',
      email: 'fdemeyer1a@yandex.ru',
      role: 'Construction Expeditor'
    },
    { id: 48, first_name: 'Kit', last_name: 'Hartzogs', email: 'khartzogs1b@goo.ne.jp', role: 'Engineer' },
    { id: 49, first_name: 'Allayne', last_name: 'Cominoli', email: 'acominoli1c@amazon.com', role: 'Electrician' },
    { id: 50, first_name: 'Sibella', last_name: 'Beddoes', email: 'sbeddoes1d@home.pl', role: 'Project Manager' }
  ]
};

export default dataTableUsersData;
