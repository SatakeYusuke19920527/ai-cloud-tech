# 第 5 章：ディープラーニングの要素技術

## 5.1 Overview

ディープラーニングを支える主要な要素技術には、  
ネットワーク構造、最適化手法、正則化、そして学習を安定させるための補助的手法などがある。  
これらはモデルの性能・安定性・汎化能力を大きく左右する。

---

## 5.2 Activation Functions（活性化関数）

### 5.2.1 Sigmoid

- 値を 0〜1 に圧縮
- 勾配消失が起きやすい
- 古典的手法だが現在はあまり使われない

### 5.2.2 Tanh

- 値を -1〜1 に圧縮
- Sigmoid より中心が 0 のため学習が安定
- しかし同じく勾配消失の課題あり

### 5.2.3 ReLU

- 現代 DL の標準
- 勾配消失しにくい
- 計算が軽い
- Dying ReLU 問題がある（入力が負だと勾配が 0）

### 5.2.4 Variants (Leaky ReLU / GELU / Swish)

- ReLU の欠点を補う改良版
- 最新モデルでは GELU や Swish が多用される

---

## 5.3 Optimization Methods（最適化手法）

### 5.3.1 Gradient Descent

- パラメータを勾配方向に更新する基本手法

### 5.3.2 SGD（確率的勾配降下法）

- 大規模データで高速に学習可能
- 変動があるため局所解から抜けやすい

### 5.3.3 Momentum

- 速度を持たせることで滑らかな更新を実現
- 鞍点から脱出しやすい

### 5.3.4 Adam

- 近年最も使用される
- 勾配の 1 次・2 次モーメントを利用し、学習が安定
- ほぼデファクトスタンダード

---

## 5.4 Regularization Techniques（正則化）

### 5.4.1 Dropout

- ニューロンをランダムに無効化
- 過学習を防ぎ汎化性能を改善

### 5.4.2 Batch Normalization

- 各層の分布を正規化
- 学習が高速化し、安定性が向上
- Transformer では LayerNorm が一般的

### 5.4.3 Weight Decay

- 重みの値が大きくなりすぎるのを防止
- 過学習抑制に有効

---

## 5.5 Initialization Methods（初期化手法）

### 5.5.1 Xavier Initialization

- Sigmoid / Tanh に適した初期化

### 5.5.2 He Initialization

- ReLU 系に適した初期化
- 現代では最も一般的

---

## 5.6 Convolutional Techniques（CNN 要素技術）

### 5.6.1 Convolution（畳み込み）

- 画像の局所特徴を抽出
- パラメータは共有され計算効率が高い

### 5.6.2 Pooling

- 空間情報を圧縮しロバスト化
- 最大プーリングがよく使われる

### 5.6.3 Dilated Convolution（拡張畳み込み）

- 受容野を広げつつ計算量を抑える
- セグメンテーションや音声処理で活躍

---

## 5.7 Attention & Transformer Elements

- Self-Attention により全体の関係性を処理
- 長距離依存を効率的に学習
- LayerNorm、Multi-Head Attention、Feed Forward Network が主要構成要素

---

## 5.8 Summary

ディープラーニングの性能を左右するのは  
「構造」だけでなく、  
**活性化関数／最適化手法／正則化／初期化／Attention** といった多くの要素技術である。  
これらを正しく理解することで、より高性能なモデル設計が可能になる。
