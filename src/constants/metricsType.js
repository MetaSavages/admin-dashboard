export const MetricsType = {
  RegistrationStart: 'registration_start',
  KycStart: 'kyc_start',
  RegistrationComplete: 'registration_complete',
  TutorialStepComplete: 'tutorial_step_complete',
  SessionStart: 'session_start',
  SessionEnd: 'session_end', // {playtime: 10m, isPlayerInitiated: true/false }
  // playtime added by the backend, isPlayerInitiated - true if the player iniciated the event with user logout
  GameBet: 'game_bet', // {amount: 10, gameType: GameTypeEnum}
  GameWin: 'game_win', // {amount: 10, gameType: GameTypeEnum}
  GameLose: 'game_lose', // {amount: 10, gameType: GameTypeEnum}
  Cashout: 'cashout',
  CasinoEnter: 'casino_enter',
  CasinoLeave: 'casino_leave',
  BlackjackSessionStart: 'blackjack_session_start',
  BlackjackSessionEnd: 'blackjack_session_end',
  RouletteSessionStart: 'roulette_session_start',
  RouletteSessionEnd: 'roulette_session_end',
  SlotsSessionStart: 'slots_session_start',
  SlotsSessionEnd: 'slots_session_end',
  BaccaratSessionStart: 'baccarat_session_start',
  BaccaratSessionEnd: 'baccarat_session_end',
  GameEvent: 'game_event',
  DepositStarted: 'deposit_started', // {amount: 10}
  DepositFinished: 'deposit_finished', // {amount: 10}
  DepositCanceled: 'deposit_canceled', // {amount: 10}
  WithdrawInitialized: 'withdraw_initialized', // {amount: 10} // Transaction is initialized to be processed
  WithdrawStarted: 'withdraw_started', // {amount: 10} // Transaction is on blockchain queue
  WithdrawApproved: 'withdraw_approved', // {amount: 10} // Transaction is approved by admins
  WithdrawFinished: 'withdraw_finished', // {amount: 10} // Transaction is finished
  WithdrawToManualRequest: 'withdraw_manual_request', // {amount: 10}
  WithdrawCanceled: 'withdraw_canceled', // {amount: 10} // Transaction is failed
  NicknameEditted: 'nickname_editted',
  CrashSessionStart: 'crash_session_start',
  CrashSessionEnd: 'crash_session_end',
  JetpackSessionStart: 'jetpack_session_start',
  JetpackSessionEnd: 'jetpack_session_end',
  FirstDeposit: 'first_deposit',
  DemoUserCreated: 'demo_user_created',
  DemoUserDeleted: 'demo_user_deleted',
  DemoUserLogin: 'demo_user_login',
  UserSessionStart: 'user_session_start',
  UserSessionEnd: 'user_session_end',
  BlackjackSessionReset: 'blackjack_session_reset'
};
