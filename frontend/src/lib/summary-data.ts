import type { SummaryChapter } from '../types/types';
export const summaryChapters: SummaryChapter[] = [
  {
    slug: 'chapter-1',
    title: '第1章 人工知能とは',
    description: 'AIの定義や弱いAI/強いAIなど基本概念を整理',
    keywords: [
      {
        term: 'AI効果',
        meaning: 'AIが成功すると、それがAIではなく単なる技術と見なされる現象。',
      },
      {
        term: 'エージェント',
        meaning: '環境を観測し、行動を選択し、目標達成を目指す自律的な存在。',
      },
      {
        term: '人工知能',
        meaning: '人間の知的行為を模倣・実現する計算システム全般。',
      },
      {
        term: '機械学習',
        meaning: 'データから規則性を学習し、モデルを構築する手法。',
      },
      {
        term: 'ディープラーニング',
        meaning: '多層のニューラルネットを用いた機械学習手法の一種。',
      },
      {
        term: 'シンギュラリティ',
        meaning: 'AIが人間を超え、技術的爆発が起きるとされる特異点。',
      },
      {
        term: 'シンボルグラウンディング問題',
        meaning: '記号の意味をどのように実世界へ結びつけるかの哲学的問題。',
      },
      {
        term: '身体性',
        meaning: '知能は身体と環境の相互作用によって成立するという考え方。',
      },
      {
        term: 'ダートマス会議',
        meaning: '1956年に開催されたAI研究の出発点となる歴史的会議。',
      },
      {
        term: 'トイ・プロブレム',
        meaning: '簡略化された小規模の問題設定でAI技術を検証する課題。',
      },
      {
        term: '知識獲得のボトルネック',
        meaning: '専門家の知識をシステムに入力する際のコスト・困難さの問題。',
      },
      {
        term: 'チューリングテスト',
        meaning: '対話を通じて人間と機械を区別できるか試すテスト。',
      },
      {
        term: '中国語の部屋',
        meaning: 'システムは理解せずとも入力出力だけで会話可能とする思考実験。',
      },
      {
        term: '強いAIと弱いAI',
        meaning: '強いAIは人間同等の汎用知能、弱いAIは特化型知能を指す区別。',
      },
      {
        term: '統計的機械翻訳',
        meaning: '大量の対訳データに基づき翻訳確率を推定する翻訳手法。',
      },
      {
        term: 'フレーム問題',
        meaning: '行動が影響しない事柄まで記述すべきかという推論上の困難。',
      },
      {
        term: 'ルールベース機械翻訳',
        meaning: '文法ルールと辞書に基づいて翻訳する伝統的手法。',
      },
      {
        term: 'ローブナーコンテスト',
        meaning: 'チューリングテスト形式で最も人間らしい対話を競う大会。',
      },
    ],
  },
  {
    slug: 'chapter-2',
    title: '第2章 人工知能をめぐる動向',
    description: 'AIブームの歴史と社会的背景を俯瞰',
    keywords: [
      { term: 'αβ法', meaning: 'ミニマックス探索を高速化する枝刈り手法。' },
      {
        term: 'Mini-Max法',
        meaning: 'ゲーム木で勝率最大化を目指す探索アルゴリズム。',
      },
      {
        term: 'SHRDLU',
        meaning: 'ブロックの世界で自然言語理解を実現した初期AIシステム。',
      },
      {
        term: 'STRIPS',
        meaning: 'ロボット行動計画用の形式的ルール表現システム。',
      },
      {
        term: '探索木',
        meaning: '問題空間を木構造として表現し探索する枠組み。',
      },
      {
        term: 'ハノイの塔',
        meaning: '探索アルゴリズムの教材として使われる古典的パズル問題。',
      },
      {
        term: '幅優先探索',
        meaning: '探索木を横方向に広げながら探索する手法。',
      },
      {
        term: '深さ優先探索',
        meaning: '探索木を縦方向に深くたどる探索手法。',
      },
      {
        term: 'ブルートフォース',
        meaning: '全探索で解を求める単純だが確実な方法。',
      },
      {
        term: 'モンテカルロ法',
        meaning: 'ランダムサンプリングで推定・探索する確率的手法。',
      },

      {
        term: 'Cycプロジェクト',
        meaning: '常識知識を大量に構築しようとした大規模AIプロジェクト。',
      },
      {
        term: 'DENDRAL',
        meaning: '化学構造を推論する初期の専門家システム。',
      },
      {
        term: 'is-a / has-a / part-of',
        meaning: '知識表現で使われる階層・所有・部分の関係。',
      },
      {
        term: 'Question-Answering',
        meaning: '質問に対して適切な答えを返すAI技術。',
      },
      {
        term: '意味ネットワーク',
        meaning: '概念同士を関係で結んだ知識表現グラフ。',
      },
      {
        term: 'イライザ (ELIZA)',
        meaning: 'パターンマッチングで会話を模倣する初期チャットボット。',
      },
      {
        term: 'インタビューシステム',
        meaning: '質問と応答で情報を収集するAI対話システム。',
      },
      {
        term: 'ウェブマイニング',
        meaning: 'ウェブデータを対象に行うデータマイニング技術。',
      },
      {
        term: 'オントロジー',
        meaning: '概念と関係を体系化した知識モデル。',
      },
      {
        term: 'セマンティックWeb',
        meaning: 'Webに意味情報を付与し機械が理解できるようにする構想。',
      },
      {
        term: 'データマイニング',
        meaning: '大量データから規則やパターンを発見する技術。',
      },
      {
        term: '東ロボくん',
        meaning: 'AIで大学入試突破を目指した日本の研究プロジェクト。',
      },
      {
        term: 'マイシン (MYCIN)',
        meaning: '感染症診断を行う初期の専門家システム。',
      },
      {
        term: 'ワトソン',
        meaning: 'IBMが開発しクイズ番組Jeopardy!で勝利したQA AIシステム。',
      },

      {
        term: '次元の呪い',
        meaning: '高次元になるとデータが疎になり解析が困難になる現象。',
      },
      {
        term: 'スパムフィルタ',
        meaning: '迷惑メールを自動分類する機械学習システム。',
      },
      {
        term: 'ビッグデータ',
        meaning: '巨大で多様・高速なデータ集合の総称。',
      },
      {
        term: 'レコメンデーションエンジン',
        meaning: 'ユーザに商品・コンテンツを推薦するシステム。',
      },
      {
        term: '統計的自然言語処理',
        meaning: '統計・確率に基づく自然言語処理の手法群。',
      },

      {
        term: 'ImageNet',
        meaning: '大量のラベル付き画像を集めた大規模データセット。',
      },
      {
        term: 'ILSVRC',
        meaning: 'ImageNetを用いた画像認識の国際コンペティション。',
      },
      {
        term: 'LeNet',
        meaning: '初期のCNNで手書き数字認識に成功したモデル。',
      },
      {
        term: 'アルファ碁 (AlphaGo)',
        meaning: 'ディープラーニング + 検索で囲碁のプロに勝利したAI。',
      },
      {
        term: '人間の神経回路',
        meaning: '人工ニューラルネットのモデル元となった生物の脳構造。',
      },
      {
        term: 'ネオコグニトロン',
        meaning: 'CNNの源流となる階層型視覚モデル。',
      },
      {
        term: '生成AI',
        meaning: '画像・文章・音声などを生成するAIモデル全般。',
      },
    ],
  },
  {
    slug: 'chapter-3',
    title: '第3章 機械学習の具体的手法',
    description: '教師あり/なし学習や代表アルゴリズムの要点',
    keywords: [
      {
        term: 'アンサンブル学習',
        meaning: '複数のモデルを組み合わせて精度を向上させる手法。',
      },
      { term: 'カーネル', meaning: '非線形データを高次元に写像する関数。' },
      {
        term: 'カーネルトリック',
        meaning: '高次元の計算を直接行わず内積だけで処理する仕組み。',
      },
      { term: '回帰問題', meaning: '数値を予測する機械学習タスク。' },
      { term: '決定木', meaning: '特徴量による条件分岐で予測するモデル。' },
      {
        term: '勾配ブースティング',
        meaning: '弱学習器を逐次追加し誤差を改善する手法。',
      },
      {
        term: 'サポートベクターマシン (SVM)',
        meaning: 'マージンを最大化する分類・回帰手法。',
      },
      { term: '線形回帰', meaning: '変数の線形関係を用いて値を予測する手法。' },
      {
        term: '自己回帰モデル (ARモデル)',
        meaning: '過去の値から未来の値を予測する時系列モデル。',
      },
      {
        term: '単回帰分析',
        meaning: '1つの説明変数で目的変数を予測する回帰分析。',
      },
      { term: '重回帰分析', meaning: '複数の説明変数で予測する回帰分析。' },
      { term: '多クラス分類', meaning: '3種類以上のクラスを分類するタスク。' },
      {
        term: 'バギング',
        meaning: 'データを複数サンプリングして並列学習する手法。',
      },
      {
        term: 'ブースティング',
        meaning: '誤分類例を重視し改善を重ねる逐次学習手法。',
      },
      {
        term: 'ブートストラップサンプリング',
        meaning: '元データから復元抽出でサンプルを作る方法。',
      },
      { term: '分類問題', meaning: 'カテゴリを予測する機械学習タスク。' },
      {
        term: 'ベクトル自己回帰モデル (VARモデル)',
        meaning: '複数時系列間の相互依存を扱うモデル。',
      },
      {
        term: 'マージン最大化',
        meaning: 'クラス境界とデータの距離を最大にする考え方（SVMの基礎）。',
      },
      {
        term: 'ランダムフォレスト',
        meaning: '複数の決定木を平均化するアンサンブル手法。',
      },
      {
        term: 'ロジスティック回帰',
        meaning: '確率を出力し二値分類を行うモデル。',
      },

      {
        term: 'k-means法',
        meaning: 'クラスタ中心を更新しながら分割するクラスタリング手法。',
      },
      { term: 't-SNE', meaning: '高次元データを2〜3次元に可視化する手法。' },
      {
        term: 'ウォード法',
        meaning: 'クラスタ間の分散の増加を最小化する階層クラスタリング。',
      },
      {
        term: '協調フィルタリング',
        meaning: '類似ユーザやアイテムに基づく推薦手法。',
      },
      {
        term: 'クラスタリング',
        meaning: 'データを似た特徴でグループ化する手法。',
      },
      {
        term: 'コールドスタート問題',
        meaning: '新規ユーザやアイテムの推薦が難しい問題。',
      },
      {
        term: 'コンテンツベースフィルタリング',
        meaning: 'アイテムの特徴に基づいて推薦する手法。',
      },
      { term: '次元削減', meaning: '特徴量をより少ない次元に圧縮する処理。' },
      {
        term: '主成分分析 (PCA)',
        meaning: '分散が最大となる軸にデータを写す次元削減手法。',
      },
      {
        term: '潜在的ディリクレ配分法 (LDA)',
        meaning: '文書を潜在トピックに分解するトピックモデル。',
      },
      {
        term: '多次元尺度構成法 (MDS)',
        meaning: 'データ間距離を保ちながら低次元に配置する手法。',
      },
      {
        term: 'デンドログラム (樹形図)',
        meaning: '階層クラスタリング結果を木構造で示す図。',
      },
      {
        term: '特異値分解 (SVD)',
        meaning: '行列を特異ベクトルへ分解する手法（推薦や次元削減に使用）。',
      },
      {
        term: 'トピックモデル',
        meaning: '文書から潜在的な話題を推定するモデル群。',
      },

      {
        term: 'Actor-Critic',
        meaning: '価値関数と方策を同時に学習する強化学習手法。',
      },
      { term: 'ε-greedy方策', meaning: '一定確率でランダム行動する探索方策。' },
      { term: 'REINFORCE', meaning: '方策勾配に基づく強化学習アルゴリズム。' },
      {
        term: 'Q学習',
        meaning: '行動価値をテーブル更新で最適化する強化学習手法。',
      },
      {
        term: 'UCB方策',
        meaning: '未探索の価値を楽観的に見積もるバンディット方策。',
      },
      { term: '行動価値関数', meaning: '状態と行動の価値を表す関数(Q値)。' },
      { term: '状態価値関数', meaning: '状態そのものの価値を示す関数(V値)。' },
      {
        term: 'バンディットアルゴリズム',
        meaning: '試行と報酬のトレードオフを扱う最適化手法。',
      },
      {
        term: '方策勾配法',
        meaning: '方策（行動確率）を微分して改善する手法。',
      },
      {
        term: 'マルコフ決定過程',
        meaning: '状態・行動・遷移で構成される強化学習の数学的枠組み。',
      },
      { term: '割引率', meaning: '将来報酬の現在価値を調整するパラメータ。' },
      {
        term: 'SARSA',
        meaning: '状態・行動・報酬・次状態・次行動で更新する強化学習手法。',
      },

      {
        term: 'k-分割交差検証',
        meaning: 'データをk分割し交互に検証する精度評価方法。',
      },
      {
        term: '平均二乗誤差 (MSE)',
        meaning: '誤差の二乗平均を取った回帰評価指標。',
      },
      {
        term: '二乗平均平方根誤差 (RMSE)',
        meaning: 'MSEの平方根。誤差を元の単位で表す。',
      },
      {
        term: '平均絶対値誤差 (MAE)',
        meaning: '誤差の絶対値平均を示す評価指標。',
      },
      {
        term: 'ROC曲線・AUC',
        meaning: '分類性能を閾値に依存せず評価する指標。',
      },
      {
        term: '赤池情報量規準 (AIC)',
        meaning: 'モデルの複雑さと当てはまりのバランスを測る指標。',
      },
      {
        term: 'オッカムの剃刀',
        meaning: '最も単純なモデルを選ぶべきという原則。',
      },
      { term: '過学習', meaning: '訓練データに適合しすぎて汎化できない状態。' },
      { term: '交差検証', meaning: 'データ分割により汎化性能を推定する方法。' },
      { term: '偽陽性・偽陰性', meaning: '誤った陽性判定・誤った陰性判定。' },
      { term: '真陽性・真陰性', meaning: '正しく陽性・陰性を判定した結果。' },
      { term: '混同行列', meaning: '分類結果を4区分で示す表。' },
      {
        term: '正解率・適合率・再現率・F値',
        meaning: '分類性能を多角的に評価する主要指標。',
      },
      { term: '汎化性能', meaning: '未知データで性能を発揮する能力。' },
      {
        term: 'ベイズ情報量規準 (BIC)',
        meaning: 'AICにペナルティを加えたモデル選択指標。',
      },
      {
        term: 'ホールドアウト検証',
        meaning: '訓練・テストに分割して評価する方法。',
      },
    ],
  },
  {
    slug: 'chapter-4',
    title: '第4章 ディープラーニングの概要',
    description: 'ニューラルネットワークの基本構造と学習プロセス',
    keywords: [
      { term: 'CPU', meaning: '汎用計算を行う中央処理装置。' },
      {
        term: 'GPU',
        meaning: '大量の並列演算が得意な処理装置（深層学習向き）。',
      },
      { term: 'TPU', meaning: 'Googleが開発した深層学習専用プロセッサ。' },
      {
        term: '隠れ層・入力層・出力層',
        meaning: 'ニューラルネットの基本構造を構成する3つの層。',
      },
      {
        term: '多層パーセプトロン',
        meaning: '複数の中間層を持つニューラルネットモデル。',
      },
      {
        term: '単純パーセプトロン',
        meaning: '1層のみの基本的なパーセプトロンモデル。',
      },

      {
        term: 'Leaky ReLU関数',
        meaning: '負の領域に小さな傾きを持つ活性化関数。',
      },
      { term: 'ReLU関数', meaning: '0より大きければそのまま返す活性化関数。' },
      { term: 'tanh関数', meaning: '出力が-1〜1のS字型活性化関数。' },
      { term: 'シグモイド関数', meaning: '0〜1で出力するS字型活性化関数。' },
      { term: 'ソフトマックス関数', meaning: '出力を確率分布に変換する関数。' },
      {
        term: '勾配消失問題',
        meaning: '深い層で勾配が小さくなり学習が進まなくなる問題。',
      },

      {
        term: 'Contrastive Loss',
        meaning: '類似・非類似のペア学習に使う損失関数。',
      },
      {
        term: 'Triplet Loss',
        meaning: 'アンカー・ポジティブ・ネガティブの距離差で学習する損失関数。',
      },
      { term: 'KL情報量', meaning: '2つの確率分布の差を測る指標。' },
      {
        term: '交差エントロピー',
        meaning: '分類タスクで最もよく用いられる損失関数。',
      },
      {
        term: '平均二乗誤差関数',
        meaning: '回帰問題で使われる誤差の二乗平均。',
      },

      { term: 'L0正則化', meaning: '非ゼロパラメータ数を抑える正則化。' },
      {
        term: 'L1正則化',
        meaning: '重みの絶対値をペナルティとする正則化（疎な解を得る）。',
      },
      {
        term: 'L2正則化',
        meaning: '重みの二乗をペナルティとする正則化（安定化）。',
      },
      {
        term: '正則化',
        meaning: '過学習を防ぐためモデルの複雑さに制約をかける手法。',
      },
      {
        term: 'ドロップアウト',
        meaning: '学習中にノードを無効化し過学習を防ぐ手法。',
      },
      { term: 'ラッソ回帰', meaning: 'L1正則化を用いる線形回帰。' },
      { term: 'リッジ回帰', meaning: 'L2正則化を用いる線形回帰。' },

      {
        term: '勾配爆発問題',
        meaning: '勾配が過度に大きくなり学習が不安定になる問題。',
      },
      {
        term: '信用割当問題',
        meaning: 'どの行動が結果に寄与したか判断しづらい問題。',
      },
      {
        term: '連鎖律',
        meaning:
          '複合関数の微分を伝搬する微分法則（バックプロパゲーションの基礎）。',
      },

      { term: 'AdaBound', meaning: 'Adamに上下限を設け安定させた最適化手法。' },
      { term: 'AdaDelta', meaning: '学習率を自動調整する最適化手法。' },
      { term: 'AdaGrad', meaning: '勾配の累積で学習率を調整する最適化手法。' },
      {
        term: 'Adam',
        meaning: 'モーメンタムとAdaGradを組み合わせた最適化手法。',
      },
      { term: 'AMSBound', meaning: 'Adamの学習率を安定化した改良版。' },
      { term: 'RMSprop', meaning: '勾配の移動平均を利用する最適化手法。' },
      { term: '鞍点', meaning: '勾配が0だが最適解でない位置。' },
      { term: 'イテレーション', meaning: 'パラメータ更新の1回の繰り返し。' },
      { term: 'エポック', meaning: 'データ全体を1周学習する単位。' },
      {
        term: 'オンライン学習',
        meaning: '逐次データを使いながら学習する方法。',
      },
      { term: '学習率', meaning: '勾配による更新量を決めるパラメータ。' },
      {
        term: '確率的勾配降下法 (SGD)',
        meaning: 'データを1つずつ使って更新する勾配降下法。',
      },
      {
        term: 'グリッドサーチ',
        meaning: '候補値を全探索して最適なハイパーパラメータを見つける方法。',
      },
      {
        term: '勾配降下法',
        meaning: '勾配方向にパラメータを更新する最適化手法。',
      },
      { term: '局所最適解', meaning: '近傍では最適だが全体では最適でない解。' },
      {
        term: '早期終了',
        meaning: '性能悪化前に学習を打ち切り過学習を防ぐ方法。',
      },
      { term: '大域最適解', meaning: '全体で最も良い解。' },
      {
        term: '二重降下現象',
        meaning: 'モデルの複雑さが増えても誤差が再び減る現象。',
      },
      {
        term: 'ノーフリーランチの定理',
        meaning: 'すべての問題に最適な学習アルゴリズムは存在しないという定理。',
      },
      {
        term: 'ハイパーパラメータ',
        meaning: '学習率などモデル外側で設定するパラメータ。',
      },
      { term: 'バッチ学習', meaning: '全データを用いて更新する学習方法。' },
      {
        term: 'ミニバッチ学習',
        meaning: 'データを小さな塊に分けて学習する方法。',
      },
      {
        term: 'モーメンタム',
        meaning: '過去の勾配を利用して更新を安定化する手法。',
      },
      {
        term: 'ランダムサーチ',
        meaning: 'ランダムにハイパーパラメータを探索する方法。',
      },
    ],
  },
  {
    slug: 'chapter-5',
    title: '第5章 ディープラーニングの要素技術',
    description: '主要アーキテクチャや最適化テクニックの用語集',
    keywords: [
      { term: '重み', meaning: 'ニューラルネットで入力に掛けるパラメータ。' },
      { term: '線形関数', meaning: '重みとバイアスで入力を線形変換する関数。' },

      {
        term: 'Atrous Convolution',
        meaning: '間引き（ダイレーション）を入れ広い受容野を持つ畳み込み。',
      },
      {
        term: 'Depthwise Separable Convolution',
        meaning: '空間とチャネルの畳み込みを分離し計算を削減する手法。',
      },
      {
        term: 'Dilated Convolution',
        meaning: 'フィルタ間隔を空け受容野を広げる畳み込み。',
      },
      { term: 'カーネル', meaning: '畳み込み時に使う小さな重み行列。' },
      { term: 'ストライド', meaning: '畳み込み時の移動幅。' },
      {
        term: '畳み込み操作',
        meaning: 'フィルタをスライドさせ特徴を抽出する処理。',
      },
      {
        term: '畳み込みニューラルネットワーク (CNN)',
        meaning: '画像処理に強い畳み込み層中心のニューラルネット。',
      },
      { term: '特徴マップ', meaning: '畳み込み後に得られる特徴表現のマップ。' },
      { term: 'パディング', meaning: '畳み込み前に周辺へゼロを追加する操作。' },
      { term: 'フィルタ', meaning: '畳み込みで使う特徴抽出のための重み集合。' },

      {
        term: 'グループ正規化',
        meaning: 'チャネルをグループ分けして正規化する手法。',
      },
      {
        term: 'バッチ正規化',
        meaning: 'バッチ単位で平均・分散を正規化し学習を安定化させる手法。',
      },
      { term: 'レイヤー正規化', meaning: '層全体の特徴を正規化する手法。' },
      {
        term: 'インスタンス正規化',
        meaning: 'サンプルごとに正規化を行う手法。',
      },

      {
        term: 'グローバルアベレージプーリング (GAP)',
        meaning: '空間方向の平均を取り1ベクトルに圧縮する操作。',
      },
      {
        term: '最大値プーリング',
        meaning: '領域内の最大値を取り特徴を抽出する操作。',
      },
      {
        term: '不変性の獲得',
        meaning: '位置や回転などに左右されにくくする性質獲得。',
      },
      {
        term: '平均値プーリング',
        meaning: '領域内の平均値を取るプーリング操作。',
      },

      {
        term: 'ResNet',
        meaning: '残差接続により深いネットの学習を可能にしたネットワーク。',
      },

      { term: 'BPTT', meaning: '時系列に沿って展開して誤差逆伝播を行う手法。' },
      { term: 'GRU', meaning: 'ゲート構造で長期依存を扱うRNNモデル。' },
      { term: 'LSTM', meaning: '長期依存を扱うためのゲート付きRNNモデル。' },
      {
        term: 'エルマンネットワーク',
        meaning: '隠れ状態をフィードバックする初期RNNモデル。',
      },
      {
        term: '勾配消失問題',
        meaning: '深いネットで勾配が小さくなり学習が進まない問題。',
      },
      {
        term: '勾配爆発問題',
        meaning: '勾配が大きくなり学習が不安定になる問題。',
      },
      {
        term: '教師強制',
        meaning: 'RNNの訓練で正解データを次ステップの入力に使う方法。',
      },
      {
        term: 'ゲート機構',
        meaning: '情報の保持・忘却を制御するRNNの仕組み。',
      },
      {
        term: '双方向RNN (Bidirectional RNN)',
        meaning: '前方向と後方向の2方向から学習するRNN。',
      },
      { term: '時系列データ', meaning: '時間順に並んだデータ。' },
      {
        term: 'ジョルダンネットワーク',
        meaning: '出力を次時刻の入力にフィードバックするRNN。',
      },
      {
        term: 'リカレントニューラルネットワーク (RNN)',
        meaning: '時系列処理を行うニューラルネットモデル。',
      },

      { term: 'Attention', meaning: '重要部分に重みを付ける仕組み。' },
      {
        term: 'Multi-Head Attention',
        meaning: '複数視点のAttentionを並列計算する仕組み。',
      },
      {
        term: 'Self-Attention',
        meaning: '系列内の要素同士の関係を直接学習するAttention。',
      },
      {
        term: 'Seq2Seq',
        meaning: '入力系列から出力系列を生成するモデル構造。',
      },
      {
        term: 'Source-Target Attention',
        meaning: 'Encoder出力をDecoderが参照するAttention。',
      },
      {
        term: 'Transformer',
        meaning: 'RNNを使わずAttentionだけで構成されたモデルアーキテクチャ。',
      },
      {
        term: '位置エンコーディング',
        meaning: '系列の位置情報を埋め込む仕組み。',
      },
      { term: 'キー', meaning: 'Attentionで照合される値。' },
      {
        term: 'クエリ',
        meaning: 'Attentionで参照するための問い合わせベクトル。',
      },
      { term: 'バリュー', meaning: 'Attentionで最終的に参照される値。' },

      { term: 'VQ-VAE', meaning: '潜在表現を離散化するオートエンコーダ。' },
      { term: 'infoVAE', meaning: '情報理論的制約を加えたVAE。' },
      {
        term: 'β-VAE',
        meaning: ' disentanglement を促すためKL項を強めたVAE。',
      },
      { term: '次元削減', meaning: '特徴を少ない次元へ圧縮する技術。' },
      {
        term: '事前学習',
        meaning: '事前に大規模データで学んだモデルを利用する方法。',
      },
      {
        term: '積層オートエンコーダ',
        meaning: '複数層を重ねたオートエンコーダ。',
      },
      {
        term: '変分オートエンコーダ (VAE)',
        meaning: '潜在空間を確率分布として扱う生成モデル。',
      },

      { term: 'Contrast', meaning: '画像のコントラストを変えるデータ拡張。' },
      { term: 'Brightness', meaning: '明るさを変えるデータ拡張。' },
      { term: 'Crop', meaning: '画像の一部を切り取るデータ拡張。' },
      { term: 'CutMix', meaning: '画像とラベルを混ぜ合わせるデータ拡張。' },
      { term: 'Cutout', meaning: '画像の一部をマスクするデータ拡張。' },
      { term: 'Mixup', meaning: '画像とラベルを線形合成するデータ拡張。' },
      { term: 'noising', meaning: 'ノイズを加えるデータ拡張。' },
      { term: 'paraphrasing', meaning: 'テキストを言い換えるデータ拡張。' },
      {
        term: 'RandAugment',
        meaning: 'ランダムに複数の変換を適用するデータ拡張手法。',
      },
      {
        term: 'Random Erasing',
        meaning: '画像の一部をランダムに削除するデータ拡張。',
      },
      { term: 'Random Flip', meaning: 'ランダムに反転させるデータ拡張。' },
      { term: 'Rotate', meaning: '画像を回転させるデータ拡張。' },
    ],
  },
  {
    slug: 'chapter-6',
    title: '第6章 ディープラーニングの応用例',
    description: '代表的なユースケースと評価指標を整理',
    keywords: [
      {
        term: 'AlexNet',
        meaning: '深層学習ブームの火付け役となったCNNモデル。',
      },
      {
        term: 'DeepLab',
        meaning:
          'Atrous畳み込みによる高精度セマンティックセグメンテーションモデル。',
      },
      {
        term: 'DenseNet',
        meaning: '各層を密結合し特徴伝播を強化するネットワーク。',
      },
      {
        term: 'EfficientNet',
        meaning: '深さ・幅・解像度を同時にスケール最適化した高効率CNN。',
      },
      {
        term: 'Fast R-CNN',
        meaning: 'ROIプーリングを導入し高速化した物体検出モデル。',
      },
      {
        term: 'Faster R-CNN',
        meaning: 'RPNにより領域提案を高速化した高精度検出モデル。',
      },
      {
        term: 'FCN',
        meaning: '全結合層を畳み込み化し画像をピクセル単位で分類するモデル。',
      },
      {
        term: 'FPN',
        meaning: 'マルチスケール特徴を融合した検出向けネットワーク。',
      },
      {
        term: 'GoogLeNet',
        meaning: 'Inception構造を導入し効率化を実現したモデル。',
      },
      {
        term: 'Mask R-CNN',
        meaning: '物体検出＋領域セグメンテーションを行うモデル。',
      },
      {
        term: 'MnasNet',
        meaning: 'NASによりモバイル向けに自動設計されたモデル。',
      },
      {
        term: 'MobileNet',
        meaning: 'Depthwise Separable Convolutionを用いた軽量モデル。',
      },
      { term: 'NAS', meaning: 'ニューラルネット構造を自動探索する仕組み。' },
      { term: 'OpenPose', meaning: '人体の関節位置を推定する姿勢推定モデル。' },
      {
        term: 'PSPNet',
        meaning: 'シーン解析のためPyramid Poolingを導入したモデル。',
      },
      {
        term: 'ResNet',
        meaning: '残差接続で深いネットの学習を可能にしたCNN。',
      },
      {
        term: 'SegNet',
        meaning: 'エンコーダ・デコーダ構造を持つセグメンテーションモデル。',
      },
      { term: 'SENet', meaning: 'チャネル注意を導入した高精度CNN。' },
      { term: 'SSD', meaning: 'マルチスケールで高速な物体検出モデル。' },
      {
        term: 'U-Net',
        meaning: '医療画像でよく使われるセグメンテーションモデル。',
      },
      { term: 'VGG', meaning: 'シンプルな構造だが高性能な深いCNN。' },
      {
        term: 'Vision Transformer',
        meaning: 'Transformerを画像に適用したモデル。',
      },
      { term: 'Wide ResNet', meaning: 'ResNetを横方向に広げた高性能モデル。' },
      { term: 'YOLO', meaning: 'リアルタイム高速物体検出モデル。' },

      {
        term: '一般物体認識',
        meaning: '画像内に何が映っているかを分類するタスク。',
      },
      {
        term: 'インスタンスセグメンテーション',
        meaning: '物体ごとに領域を切り出すタスク。',
      },
      { term: '姿勢推定', meaning: '人体の関節位置を推定するタスク。' },
      {
        term: 'セマンティックセグメンテーション',
        meaning: '各ピクセルをクラス分類するタスク。',
      },
      { term: '物体検出', meaning: '物体の位置とクラスを推定するタスク。' },
      { term: '物体識別', meaning: '画像の内容を分類するタスク。' },
      {
        term: 'パノプティックセグメンテーション',
        meaning: 'セマンティック＋インスタンスを統合した解析。',
      },

      { term: 'BERT', meaning: '双方向の文脈を学習するLLMモデル。' },
      { term: 'BoW', meaning: '単語出現回数を特徴とする表現。' },
      { term: 'CBOW', meaning: '周囲の単語から中心語を予測するword2vec手法。' },
      { term: 'CEC', meaning: 'LSTMで長期依存を扱うためのセル構造。' },
      { term: 'ChatGPT', meaning: 'GPTモデルを用いた対話型LLM。' },
      { term: 'ELMo', meaning: '文脈依存の単語表現を学習するモデル。' },
      {
        term: 'fastText',
        meaning: 'サブワード情報を使う高速単語埋め込みモデル。',
      },
      { term: 'GLUE', meaning: 'NLPモデルの性能を測る代表的ベンチマーク。' },
      {
        term: 'GPT-n',
        meaning: 'OpenAIが開発するGenerative Pretrained Transformerの系列。',
      },
      { term: 'n-gram', meaning: '連続したn単語を特徴とする統計モデル。' },
      { term: 'PaLM', meaning: 'Googleの大規模言語モデル。' },
      { term: 'Seq2Seq', meaning: '入力系列から出力系列を生成する構造。' },
      { term: 'TF-IDF', meaning: '単語の重要度を測る統計指標。' },
      { term: 'word2vec', meaning: '単語の分散表現を学習するモデル。' },
      { term: '感情分析', meaning: '文章の感情を分類するタスク。' },
      { term: '機械翻訳', meaning: '文章を他言語へ翻訳するタスク。' },
      { term: '形態素解析', meaning: '単語に分割する前処理技術。' },
      { term: '構文解析', meaning: '文の構造を解析する技術。' },
      { term: '質問応答', meaning: '質問に対する回答を生成するタスク。' },
      { term: '情報検索', meaning: 'クエリに適した文書を探す技術。' },
      {
        term: 'スキップグラム',
        meaning: '中心語から周囲語を予測するword2vecモデル。',
      },
      { term: '単語埋め込み', meaning: '単語をベクトル化する手法。' },
      { term: '分散表現', meaning: '意味的距離が反映されたベクトル表現。' },
      { term: '文書要約', meaning: '文章を短く要約するタスク。' },
      {
        term: 'ワンホットベクトル',
        meaning: '単語を1次元だけ1にしたベクトル表現。',
      },
      {
        term: '大規模言語モデル',
        meaning: '巨大データで事前学習された生成モデル。',
      },
      { term: '統計的機械翻訳', meaning: '翻訳確率を統計的に推定する手法。' },

      { term: 'A-D変換', meaning: 'アナログ信号をデジタル化する処理。' },
      { term: 'WaveNet', meaning: '音声生成に特化した深層学習モデル。' },
      { term: '音韻', meaning: '発音の基本単位。' },
      { term: '音声合成', meaning: '音声を人工的に生成する技術。' },
      { term: '音声認識', meaning: '音声をテキストに変換する技術。' },
      { term: '音素', meaning: '言語を構成する最小の音の単位。' },
      {
        term: '隠れマルコフモデル',
        meaning: '時系列を扱う確率モデル（HMM）。',
      },
      {
        term: '高速フーリエ変換',
        meaning: '信号を周波数成分に分解するアルゴリズム。',
      },
      { term: 'スペクトル包絡', meaning: '音声の周波数特性を示す形状。' },
      { term: 'PCM', meaning: '音声をデジタル化する符号化方式。' },
      { term: 'フォルマント', meaning: '音声の共鳴周波数。' },
      { term: 'MFCC', meaning: '音声認識で使われる特徴量。' },
      { term: 'メル尺度', meaning: '人間の聴覚に基づく周波数スケール。' },
      { term: '話者識別', meaning: '誰の音声かを判定する技術。' },
      {
        term: 'CTC',
        meaning: '音声と文字列の長さ不一致を扱う教師あり学習手法。',
      },

      { term: 'A3C', meaning: '並列学習を行う強化学習手法。' },
      { term: 'Agent57', meaning: 'Atariゲームで人間を超えた強化学習モデル。' },
      { term: 'APE-X', meaning: '分散型の高速DQN手法。' },
      { term: 'DQN', meaning: '深層学習を用いたQ学習モデル。' },
      { term: 'OpenAI Five', meaning: 'Dota2で世界トップを破った強化学習AI。' },
      { term: 'PPO', meaning: '安定した方策勾配法の代表モデル。' },
      { term: 'Rainbow', meaning: '複数DQN改良を統合した手法。' },
      { term: 'RLHF', meaning: '人間のフィードバックを用いた強化学習。' },
      {
        term: 'sim2real',
        meaning: 'シミュレーション学習を実世界に適用する技術。',
      },
      { term: 'AlphaStar', meaning: 'StarCraft IIで人間を超えたAI。' },
      { term: 'オフライン強化学習', meaning: '行動データのみで学習する手法。' },
      { term: '残差強化学習', meaning: '既存方策に残差を加えて改善する手法。' },
      { term: '状態表現学習', meaning: '良い状態表現を学習する手法。' },
      { term: 'ダブルDQN', meaning: '過大評価問題を解決したDQN改良版。' },
      {
        term: 'デュエリングネットワーク',
        meaning: '価値関数とアドバンテージを分離した構造。',
      },
      {
        term: 'ドメインランダマイゼーション',
        meaning: '環境をランダム化して汎化を高める手法。',
      },
      {
        term: 'ノイジーネットワーク',
        meaning: 'ノイズを重みに入れて探索する手法。',
      },
      { term: '報酬成形', meaning: '学習しやすく報酬を調整する手法。' },
      { term: 'MARL', meaning: '複数エージェントの強化学習。' },
      { term: '連続値制御', meaning: '連続行動を扱う強化学習。' },

      { term: 'CycleGAN', meaning: 'ペアなしで画像変換を学習するGAN。' },
      { term: 'DCGAN', meaning: 'CNNベースの安定したGAN構造。' },
      {
        term: 'Diffusion Model',
        meaning: 'ノイズ除去過程で生成を行うモデル。',
      },
      { term: 'NeRF', meaning: '3Dシーンをニューラル表現で再構築する技術。' },
      { term: 'Pix2Pix', meaning: 'ペア画像による画像変換モデル。' },
      { term: '音声生成', meaning: '音声を生成するAI技術。' },
      { term: '画像生成', meaning: '画像を生成するAI技術。' },
      { term: 'GAN', meaning: '生成器と識別器が競い合う生成モデル。' },
      { term: '文章生成', meaning: '自然言語文章を生成するタスク。' },

      { term: 'Few-shot', meaning: '少ないデータで学習する手法。' },
      { term: 'One-shot', meaning: '1サンプルで分類が可能になる学習。' },
      {
        term: '自己教師あり学習',
        meaning: 'ラベルなしデータから特徴を学習する手法。',
      },
      {
        term: '事前学習',
        meaning: '大規模データで学習したモデルを利用すること。',
      },
      { term: '事前学習済みモデル', meaning: 'すでに学習済みのモデル。' },
      { term: '破壊的忘却', meaning: '新しい学習で過去の知識を失う現象。' },
      {
        term: '半教師あり学習',
        meaning: 'ラベルなしデータを併用する学習手法。',
      },

      {
        term: 'CLIP',
        meaning: '画像とテキストを同時に学習するマルチモーダルモデル。',
      },
      { term: 'DALL-E', meaning: '画像生成を行うテキスト→画像モデル。' },
      { term: 'Flamingo', meaning: '少数ショット対応のマルチモーダルモデル。' },
      { term: 'Image Captioning', meaning: '画像を説明文に変換するタスク。' },
      { term: 'Text-To-Image', meaning: '文章から画像を生成するタスク。' },
      {
        term: 'Visual Question Answering',
        meaning: '画像内容に基づき質問に答えるタスク。',
      },
      {
        term: 'Unified-IO',
        meaning: '入力と出力すべてを統一処理する汎用AIモデル。',
      },
      { term: 'Zero-shot', meaning: '学習にないクラスでも推論可能な手法。' },
      { term: '基盤モデル', meaning: '多用途の巨大事前学習モデル。' },
      { term: 'マルチタスク学習', meaning: '複数タスクを同時に学習する方法。' },

      { term: 'CAM', meaning: '画像の重要領域を可視化する手法。' },
      { term: 'Grad-CAM', meaning: 'CNNの判断根拠を可視化する技術。' },
      { term: 'LIME', meaning: '局所線形モデルで予測根拠を説明する手法。' },
      { term: 'Permutation Importance', meaning: '特徴量の重要度を測る手法。' },
      {
        term: 'SHAP',
        meaning: '特徴が予測に与えた影響をゲーム理論で説明する方法。',
      },
      { term: '説明可能AI', meaning: 'AIの判断根拠を説明する技術群。' },

      { term: 'エッジAI', meaning: 'デバイス上でAI推論を行う技術。' },
      { term: '蒸留', meaning: '大モデルから小モデルへ知識を移す手法。' },
      {
        term: '宝くじ仮説',
        meaning: '良い初期重みを持つ部分ネットが存在するという仮説。',
      },
      { term: 'プルーニング', meaning: '不要な重みやノードを削減する手法。' },
      { term: 'モデル圧縮', meaning: 'モデルを軽量化する総称。' },
      { term: '量子化', meaning: '重みを低ビット化し軽量化・高速化する手法。' },
    ],
  },
  {
    slug: 'chapter-7',
    title: '第7章 AIの社会実装に向けて',
    description: 'MLOpsや社会実装プロセスのキーワード',
    keywords: [
      {
        term: 'AIのビジネス活用',
        meaning: '業務効率化・自動化・価値創出のためAIを導入すること。',
      },
      {
        term: 'AIプロジェクトの進め方',
        meaning: 'データ収集から運用までの一連のプロセス。',
      },
      { term: 'BPR', meaning: '業務プロセスを抜本的に再設計する取り組み。' },
      {
        term: 'CRISP-DM',
        meaning: 'データ分析プロジェクトの標準プロセスモデル。',
      },
      { term: 'CRISP-ML', meaning: 'ML導入のためのCRISP-DM拡張プロセス。' },
      { term: 'Docker', meaning: 'アプリをコンテナ化する仮想化技術。' },
      { term: 'Jupyter Notebook', meaning: 'データ分析用の実行型ノート環境。' },
      {
        term: 'MLOps',
        meaning: '機械学習モデルの開発から運用までを自動化する仕組み。',
      },
      { term: 'PoC', meaning: '概念実証。アイデアの有効性を検証する段階。' },
      {
        term: 'Python',
        meaning: 'AI・データ分析で最も使われるプログラミング言語。',
      },
      {
        term: 'Web API',
        meaning: '外部システムとデータや機能をやり取りする仕組み。',
      },
      { term: 'アジャイル', meaning: '小さく作り改善しながら進める開発手法。' },
      { term: 'ウォーターフォール', meaning: '工程を順番に進める開発手法。' },
      {
        term: 'オープン・イノベーション',
        meaning: '外部の知や技術を取り入れ革新を進める手法。',
      },
      {
        term: 'クラウド',
        meaning: 'インターネット経由で提供されるコンピューティング環境。',
      },
      {
        term: '産学連携',
        meaning: '企業と大学が共同で研究・事業を行う取り組み。',
      },
      {
        term: 'ステークホルダーのニーズ',
        meaning: '関係者が求める価値・要望。',
      },
      {
        term: 'データサイエンティスト',
        meaning: 'データ分析で課題解決を行う専門職。',
      },
      { term: '他企業や他業種との連携', meaning: '協力し価値を共創する活動。' },

      {
        term: 'アノテーション',
        meaning: 'データにラベルや情報を付与する作業。',
      },
      {
        term: 'オープンデータセット',
        meaning: '誰でも利用可能な公開データセット。',
      },
      { term: 'コーパス', meaning: '言語データを集めたデータベース。' },
      {
        term: 'データリーケージ',
        meaning: '不正に未来データが学習に混入する問題。',
      },

      {
        term: '移動平均',
        meaning: '一定期間の平均を取り時系列の変動を滑らかにする指標。',
      },
      { term: '確率分布', meaning: '確率変数の取りうる値とその確率の分布。' },
      { term: '確率変数', meaning: '結果が確率で決まる変数。' },
      { term: '確率密度', meaning: '連続値の確率分布を表す関数。' },
      { term: '疑似相関', meaning: '因果関係がないのに相関が見える現象。' },
      { term: '期待値', meaning: '確率変数の平均的な値。' },
      { term: '帰無仮説', meaning: '統計検定で最初に否定しようとする仮説。' },
      { term: '共分散', meaning: '2変数がどの程度一緒に変動するかを示す値。' },
      {
        term: 'コサイン類似度',
        meaning: 'ベクトル間の角度で類似度を測る指標。',
      },
      {
        term: '最小二乗法',
        meaning: '誤差の二乗和を最小化する回帰の推定方法。',
      },
      { term: '最頻値', meaning: '最も頻繁に出現する値。' },
      {
        term: '最尤法',
        meaning: '観測データが得られる確率を最大にする推定方法。',
      },
      { term: '条件付き確率', meaning: 'ある条件のもとでの確率。' },
      { term: '正規分布', meaning: '平均を中心に左右対称の連続分布。' },
      { term: '相関係数', meaning: '2変数の線形関係の強さを示す指標。' },
      { term: '相互情報量', meaning: '2変数の依存度を表す情報量。' },
      {
        term: '対立仮説',
        meaning: '帰無仮説が否定されたときに採択される仮説。',
      },
      { term: '中央値', meaning: 'データの真ん中の値。' },
      { term: '度数分布', meaning: '値の出現回数を示す分布表。' },
      { term: '二項分布', meaning: '成功確率一定の試行を繰り返す確率分布。' },
      { term: '外れ値', meaning: '他の値から大きく外れたデータ点。' },
      { term: '標準偏差', meaning: 'データの散らばりを示す指標。' },
      { term: '平均', meaning: 'データの合計を個数で割った値。' },
      { term: '分散', meaning: '平均からの偏差の二乗の平均。' },
      { term: '偏相関係数', meaning: '他の変数の影響を取り除いた相関係数。' },
      { term: 'ベルヌーイ分布', meaning: '成功/失敗の2値からなる確率分布。' },
      { term: 'ポアソン分布', meaning: '一定時間あたりの発生回数を表す分布。' },
      { term: 'マハラノビス距離', meaning: '分散を考慮した距離尺度。' },
      { term: 'ユークリッド距離', meaning: '2点間の直線距離。' },
    ],
  },
  {
    slug: 'chapter-8',
    title: '第8章 AIの法律と倫理',
    description: '倫理ガイドラインやリスク対応の重要用語',
    keywords: [
      { term: 'GDPR', meaning: 'EUの個人データ保護規則。' },
      {
        term: '仮名加工情報',
        meaning: '個人を直接識別できないよう加工した情報。',
      },
      {
        term: '個人識別符号',
        meaning: '個人を識別できる符号（例:運転免許番号など）。',
      },
      {
        term: '個人データ',
        meaning: '個人情報保護法で保護される個人関連情報。',
      },
      { term: '個人情報', meaning: '特定個人を識別できる情報。' },
      {
        term: '第三者提供',
        meaning: '本人同意なく他者へ個人情報を提供すること。',
      },
      {
        term: '匿名加工情報',
        meaning: '個人が特定できないよう不可逆に加工した情報。',
      },
      {
        term: '保有個人データ',
        meaning: '事業者が管理し開示請求対象となる個人データ。',
      },
      {
        term: '要配慮個人情報',
        meaning: '差別の原因となる可能性がある敏感情報。',
      },
      { term: '利用目的', meaning: '個人情報を使用する目的を特定したもの。' },
      { term: '委託', meaning: '個人データ処理を外部に委ねること。' },

      { term: '創作性', meaning: '著作物であるために必要な独自性。' },
      { term: '著作物', meaning: '思想や感情を創作的に表現したもの。' },
      { term: 'AI生成物', meaning: 'AIが生成したコンテンツ。' },
      { term: '利用規約', meaning: 'サービス利用に関する契約条件。' },
      { term: '著作権侵害', meaning: '著作者の権利を侵害する行為。' },
      { term: '著作権', meaning: '創作物に対する著作者の権利。' },

      { term: '発明', meaning: '技術的思想の創作。' },
      { term: '新規性', meaning: '特許が成立するための“新しい”性質。' },
      { term: '進歩性', meaning: '従来技術から容易に思いつかない性質。' },
      { term: '知的財産権', meaning: '創作物や発明を保護する権利。' },
      { term: '発明者', meaning: '発明を行った人物。' },
      { term: '職務発明', meaning: '職務で行われた発明。' },
      { term: '特許権', meaning: '発明を独占的に実施できる権利。' },

      { term: '営業秘密', meaning: '秘密管理され競争上有利な情報。' },
      {
        term: '限定提供データ',
        meaning: '一定条件下でのみ第三者へ提供できるデータ。',
      },

      { term: '競争制限', meaning: '市場競争を不当に妨げる行為。' },
      { term: '公正競争阻害性', meaning: '競争の公平性を損なう度合い。' },

      {
        term: 'AI・データ利用ガイドライン',
        meaning: '契約やデータ利用の標準指針。',
      },
      { term: 'NDA', meaning: '秘密保持契約。' },
      { term: '請負契約', meaning: '成果物の完成を約束する契約。' },
      { term: '準委任契約', meaning: '作業そのものの遂行を約束する契約。' },
      { term: '精度保証', meaning: 'AIモデルの性能保証に関する取り決め。' },
      { term: '保守契約', meaning: '運用後に維持管理を行う契約。' },

      { term: 'SaaS', meaning: 'クラウド上で提供されるソフトウェアサービス。' },
      { term: 'データ利用権', meaning: 'データを利用するための権利。' },

      { term: 'AI倫理', meaning: 'AIの利用における倫理的配慮。' },
      { term: 'AIガバナンス', meaning: 'AIを適切に管理・監督する仕組み。' },
      { term: '価値原則', meaning: '倫理ガイドラインの基盤となる価値体系。' },
      { term: 'ハードロー', meaning: '法律として拘束力のあるルール。' },
      { term: 'ソフトロー', meaning: '法的拘束力はないが推奨される指針。' },
      {
        term: 'リスクベースアプローチ',
        meaning: 'リスクに応じて対応レベルを調整する考え方。',
      },

      {
        term: 'カメラ画像利活用ガイドブック',
        meaning: '監視・撮影データを適切に扱うための指針。',
      },
      {
        term: 'プライバシー・バイ・デザイン',
        meaning: '設計段階からプライバシーを組み込む考え方。',
      },

      { term: 'アルゴリズムバイアス', meaning: 'AIが偏った結果を出す現象。' },
      {
        term: '公平性の定義',
        meaning: 'AIが公正であることをどう測るかの基準。',
      },
      {
        term: 'サンプリングバイアス',
        meaning: '偏ったデータ収集によるバイアス。',
      },
      { term: 'センシティブ属性', meaning: '差別につながる個人属性。' },
      { term: '代理変数', meaning: '本来の属性を間接的に示す変数。' },
      { term: 'データの偏り', meaning: '入力データに存在する偏り。' },

      { term: 'Adversarial Attack', meaning: 'AIを誤認させるための摂動攻撃。' },
      {
        term: 'セキュリティ・バイ・デザイン',
        meaning: '設計段階から安全性を組み込む考え方。',
      },
      { term: 'データ汚染', meaning: '学習データが不正に操作される脅威。' },
      { term: 'データ窃取', meaning: '機密データを盗まれる脅威。' },
      { term: 'モデル窃取', meaning: 'モデルそのものを盗まれる攻撃。' },
      {
        term: 'モデル汚染',
        meaning: '悪意あるデータでモデルが破壊される現象。',
      },

      {
        term: 'ディープフェイク',
        meaning: 'AIで人物の映像や音声を偽造する技術。',
      },
      {
        term: 'フェイクニュース',
        meaning: '虚偽情報をAIで生成・拡散する問題。',
      },

      {
        term: 'データの来歴',
        meaning: 'データがどこから来てどう加工されたかの履歴。',
      },
      { term: '説明可能性', meaning: 'AIの判断理由を説明できる性質。' },
      { term: 'ブラックボックス', meaning: 'AIの内部判断が理解しにくい状態。' },

      { term: 'エコーチェンバー', meaning: '似た意見ばかりが強化される環境。' },
      {
        term: 'フィルターバブル',
        meaning: '個人に最適化されすぎ情報が偏る現象。',
      },

      {
        term: '気候変動',
        meaning: 'AIモデル学習の消費電力など環境負荷の問題。',
      },
      {
        term: 'モデル学習の電力消費',
        meaning: '大規模モデルが大量の電力を消費する問題。',
      },

      { term: 'AIとの協働', meaning: 'AIと人間が役割分担して働くこと。' },
      { term: 'スキルの喪失', meaning: 'AI依存で人のスキルが失われる現象。' },
      { term: '労働力不足', meaning: 'AI活用で労働力を補う社会的背景。' },

      { term: 'インクルージョン', meaning: '誰も排除しない包摂的な設計思想。' },
      { term: '軍事利用', meaning: 'AIが兵器や軍事に使われる問題。' },
      { term: '死者への敬意', meaning: '死者をAIで模倣する際の倫理問題。' },
      {
        term: '人間の自律性',
        meaning: 'AI介入が人の意思決定を侵害しないこと。',
      },

      { term: 'AIポリシー', meaning: '組織が定めるAI利用方針。' },
      { term: 'ダイバーシティ', meaning: '多様性を尊重する価値観。' },
      {
        term: 'AIに対する監査',
        meaning: 'AIの性能・公平性・ガバナンスを監査する活動。',
      },
      { term: '倫理アセスメント', meaning: 'AI活用前に倫理面を評価する手法。' },
      {
        term: '人間の関与',
        meaning: '重要判断に人間が介在するべきという考え方。',
      },
      { term: 'モニタリング', meaning: 'AI運用後の継続的な監視。' },
      { term: '再現性', meaning: 'AIの結果が再度同じように得られる性質。' },
      { term: 'トレーサビリティ', meaning: 'AIの判断過程を追跡できる状態。' },
    ],
  },
];
