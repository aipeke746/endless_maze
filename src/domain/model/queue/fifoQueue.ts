/**
 * FIFO Queue (First In First Out)
 */
export class FifoQueue<T> {
    /**
     * キュー
     */
    private readonly queue: Map<number, T> = new Map<number, T>();
    /**
     * 先頭のインデックス
     */
    private head: number = 0;
    /**
     * 末尾のインデックス
     */
    private tail: number = 0;

    /**
     * キューに値を追加する
     * @param value 値
     */
    public enqueue(value: T): void {
        this.queue.set(this.tail, value);
        this.tail++;
    }

    /**
     * キューから値を取り出す
     * @returns 値
     */
    public dequeue(): T {
        if (this.head > this.tail) throw new Error('end of queue');
        const value = this.queue.get(this.head);
        this.queue.delete(this.head);
        this.head++;
        return value;
    }

    /**
     * キューの先頭の値を返す
     * @returns 先頭の値
     */
    public peek(): T {
        return this.queue.get(this.head);
    }

    /**
     * キューが空かどうかを返す
     * @returns キューが空かどうか
     */
    public isEmpty(): boolean {
        return this.head === this.tail;
    }
}
