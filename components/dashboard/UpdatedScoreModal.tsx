import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateScoresModal = ({ onUpdate }) => {
  const [rank, setRank] = useState('');
  const [percentile, setPercentile] = useState('');
  const [currentScore, setCurrentScore] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ rank, percentile, currentScore });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update scores</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rank" className="text-right">
              Rank
            </Label>
            <Input
              id="rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="percentile" className="text-right">
              Percentile
            </Label>
            <Input
              id="percentile"
              value={percentile}
              onChange={(e) => setPercentile(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentScore" className="text-right">
              Current Score
            </Label>
            <Input
              id="currentScore"
              value={currentScore}
              onChange={(e) => setCurrentScore(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateScoresModal;